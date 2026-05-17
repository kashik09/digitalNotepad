/**
 * Individual Note API Route
 * GET/PUT/DELETE specific note
 */

import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * GET /api/notes/[id]
 * Fetch a specific note
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: note, error } = await supabase
      .from('notes')
      .select(`
        *,
        category:categories(id, name, color, icon)
      `)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error || !note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ note });
  } catch (error) {
    console.error('Note GET error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

/**
 * PUT /api/notes/[id]
 * Update a note
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, category_id, is_completed, position } = body;

    // Build update object
    const updates: any = { updated_at: new Date().toISOString() };

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
        // Verify category belongs to user
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('id', category_id)
          .eq('user_id', user.id)
          .single();

        if (!category) {
          return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }
      }
      updates.category_id = category_id;
    }

    // Update note
    const { data: note, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error || !note) {
      return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
    }

    return NextResponse.json({ note });
  } catch (error) {
    console.error('Note PUT error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

/**
 * DELETE /api/notes/[id]
 * Delete a note
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Note DELETE error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
