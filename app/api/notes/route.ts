/**
 * Notes API Route (db.json-backed)
 * GET all notes, POST create note
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, listNotes, createNote } from '@/lib/jsondb';

export async function GET() {
  try {
    const user = await getCurrentUser();
    const notes = await listNotes(user.id);
    return NextResponse.json({ notes });
  } catch (error) {
    console.error('Notes GET error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { title, content, category_id, is_completed } = body;

    if (!title || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const result = await createNote(user.id, { title, content, category_id, is_completed });
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ note: result }, { status: 201 });
  } catch (error) {
    console.error('Notes POST error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
