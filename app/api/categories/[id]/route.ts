/**
 * Individual Category API Route (db.json-backed)
 * PUT/DELETE specific category
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, listCategories, updateCategory, deleteCategory } from '@/lib/jsondb';
import type { Category } from '@/lib/db-types';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    const body = await request.json();
    const { name, color, icon, position } = body;

    const updates: Partial<Category> = {};

    if (name !== undefined) {
      if (name.trim().length === 0) {
        return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 });
      }
      const cats = await listCategories(user.id);
      if (cats.some((c) => c.id !== id && c.name === name.trim())) {
        return NextResponse.json({ error: 'Category with this name already exists' }, { status: 409 });
      }
      updates.name = name.trim();
    }
    if (color !== undefined) updates.color = color;
    if (icon !== undefined) updates.icon = icon;
    if (position !== undefined) updates.position = position;

    const category = await updateCategory(id, user.id, updates);
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json({ category });
  } catch (error) {
    console.error('Category PUT error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    const removed = await deleteCategory(id, user.id);
    if (!removed) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
