/**
 * Individual Note API Route (db.json-backed)
 * GET/PUT/DELETE specific note
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, getNote, updateNote, deleteNote, getCategory } from '@/lib/jsondb';
import type { Note } from '@/lib/db-types';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    const note = await getNote(id, user.id);
    if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    return NextResponse.json({ note });
  } catch (error) {
    console.error('Note GET error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    const body = await request.json();
    const { title, content, category_id, is_completed, position } = body;

    const updates: Partial<Note> = {};

    if (title !== undefined) {
      if (title.trim().length === 0) {
        return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 });
      }
      updates.title = title.trim();
    }
    if (content !== undefined) updates.content = content;
    if (is_completed !== undefined) updates.is_completed = is_completed;
    if (position !== undefined) updates.position = position;

    if (category_id !== undefined) {
      if (category_id) {
        const cat = await getCategory(category_id, user.id);
        if (!cat) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
      }
      updates.category_id = category_id;
    }

    const note = await updateNote(id, user.id, updates);
    if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    return NextResponse.json({ note });
  } catch (error) {
    console.error('Note PUT error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    const removed = await deleteNote(id, user.id);
    if (!removed) return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Note DELETE error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
