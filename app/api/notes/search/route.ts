/**
 * Search API Route
 * Full-text search across user's notes
 */

import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * GET /api/notes/search?q=query
 * Search notes by title and content
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // PostgreSQL full-text search
    const { data: notes, error } = await supabase
      .from('notes')
      .select(`
        id,
        title,
        content,
        updated_at,
        category:categories(name)
      `)
      .eq('user_id', user.id)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('updated_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    // Create snippets with context around matches
    const results = notes.map((note) => ({
      id: note.id,
      title: note.title,
      snippet: createSnippet(note.content, query),
      category: note.category?.name || 'Uncategorized',
      updated_at: note.updated_at,
    }));

    // Log search to search_history table
    await supabase.from('search_history').insert({
      user_id: user.id,
      query: query.trim(),
      results_count: results.length,
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

/**
 * Create a snippet with context around the search match
 */
function createSnippet(content: string, query: string, maxLength: number = 150): string {
  if (!content) return '';

  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);

  if (index === -1) {
    // No match in content, return beginning
    return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  }

  // Extract context around the match
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 50);
  let snippet = content.slice(start, end);

  // Add ellipsis
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';

  return snippet;
}
