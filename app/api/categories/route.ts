/**
 * Categories API Route (db.json-backed)
 * GET all categories, POST create category
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, listCategories, createCategory } from '@/lib/jsondb';

export async function GET() {
  try {
    const user = await getCurrentUser();
    const categories = await listCategories(user.id);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Categories GET error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { name, color, icon } = body;

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const result = await createCategory(user.id, { name, color, icon });
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ category: result }, { status: 201 });
  } catch (error) {
    console.error('Categories POST error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
