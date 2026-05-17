/**
 * Admin Users API Route
 * Admin-only user management
 */

import { createServiceClient, createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * Verify if user is admin
 */
async function verifyAdmin(supabase: any) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { isAdmin: false, error: 'Unauthorized' };
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, is_admin')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return { isAdmin: false, error: 'Profile not found' };
  }

  // Check if user is in admin list
  const adminUsernames = (process.env.ADMIN_USERNAMES || '')
    .split(',')
    .map((u) => u.trim());

  const isAdmin = profile.is_admin || adminUsernames.includes(profile.username);

  if (!isAdmin) {
    return { isAdmin: false, error: 'Forbidden: Admin access required' };
  }

  return { isAdmin: true, user };
}

/**
 * GET /api/admin/users
 * List all users (admin only)
 */
export async function GET() {
  try {
    const supabase = createServerClient();
    const { isAdmin, error } = await verifyAdmin(supabase);

    if (!isAdmin) {
      return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });
    }

    // Fetch all profiles (no notes access!)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, username, is_admin, use_pin, created_at, updated_at, disabled_at')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    // Get user emails from auth (requires service role)
    const serviceSupabase = createServiceClient();
    const { data: authUsers, error: authError } = await serviceSupabase.auth.admin.listUsers();

    if (authError) {
      console.error('Error fetching auth users:', authError);
      return NextResponse.json({ error: 'Failed to fetch user emails' }, { status: 500 });
    }

    // Merge profile data with email
    const users = profiles.map((profile) => {
      const authUser = authUsers.users.find((u) => u.id === profile.id);
      return {
        ...profile,
        email: authUser?.email || null,
      };
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Admin users GET error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

/**
 * PUT /api/admin/users
 * Update user (disable/enable) - admin only
 */
export async function PUT(request: Request) {
  try {
    const supabase = createServerClient();
    const { isAdmin, error } = await verifyAdmin(supabase);

    if (!isAdmin) {
      return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });
    }

    const body = await request.json();
    const { user_id, disabled } = body;

    if (!user_id) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    const updates: any = {};
    if (disabled !== undefined) {
      updates.disabled_at = disabled ? new Date().toISOString() : null;
    }

    const { data: profile, error: updateError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user_id)
      .select()
      .single();

    if (updateError || !profile) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Admin users PUT error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/users
 * Delete user account - admin only
 */
export async function DELETE(request: Request) {
  try {
    const supabase = createServerClient();
    const { isAdmin, error } = await verifyAdmin(supabase);

    if (!isAdmin) {
      return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
    }

    // Delete user from auth (cascades to profile, notes, categories via FK)
    const serviceSupabase = createServiceClient();
    const { error: deleteError } = await serviceSupabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin users DELETE error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
