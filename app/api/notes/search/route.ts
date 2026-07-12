/**
 * Search API Route (db.json-backed)
 * GET /api/notes/search?q=query
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, searchNotes } from '@/lib/jsondb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const user = await getCurrentUser();
    const results = await searchNotes(user.id, query);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
