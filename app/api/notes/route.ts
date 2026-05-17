/**
 * Notes API Route
 * GET all notes, POST create note
 */

import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * GET /api/notes
 * Fetch all notes for the authenticated user
 */
export async function GET(request: Request) {
  try {
    const supabase = createServerClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch notes with category information
    const { data: notes, error } = await supabase
      .from('notes')
      .select(`
        *,
        category:categories(name, color, icon)
      `)
      .eq('user_id', user.id)
      .order('position', { ascending: true })
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch notes' },
        { status: 500 }
      );
    }

    return NextResponse.json({ notes });
  } catch (error) {
    console.error('Notes GET error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notes
 * Create a new note
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, category_id, is_completed } = body;

    if (!title || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Verify category belongs to user if provided
    if (category_id) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('id', category_id)
        .eq('user_id', user.id)
        .single();

      if (!category) {
        return NextResponse.json(
          { error: 'Invalid category' },
          { status: 400 }
        );
      }
    }

    // Create note
    const { data: note, error } = await supabase
      .from('notes')
      .insert({
        user_id: user.id,
        title: title.trim(),
        content: content || '',
        category_id: category_id || null,
        is_completed: is_completed || false,
        position: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating note:', error);
      return NextResponse.json(
        { error: 'Failed to create note' },
        { status: 500 }
      );
    }

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error('Notes POST error:', error);
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
