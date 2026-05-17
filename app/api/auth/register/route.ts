/**
 * Registration API Route
 * Creates Supabase user + profile with optional PIN
 */

import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, email, password, pin } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate PIN format if provided
    if (pin && !/^\d{4}$/.test(pin)) {
      return NextResponse.json(
        { error: 'PIN must be exactly 4 digits' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check if username already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingProfile) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    // Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || 'Failed to create account' },
        { status: 400 }
      );
    }

    // Hash PIN if provided
    let pinHash: string | null = null;
    if (pin) {
      pinHash = await bcrypt.hash(pin, 10);
    }

    // Check if user is admin
    const adminUsernames = (process.env.ADMIN_USERNAMES || '').split(',').map(u => u.trim());
    const isAdmin = adminUsernames.includes(username);

    // Create profile record
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      username,
      is_admin: isAdmin,
      use_pin: !!pin,
      pin_hash: pinHash,
    });

    if (profileError) {
      // Cleanup: delete auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: 'Failed to create profile' },
        { status: 500 }
      );
    }

    // Create default user preferences
    const { error: prefsError } = await supabase.from('user_preferences').insert({
      user_id: authData.user.id,
      theme_mode: 'dark',
      theme_name: 'cyber-neon',
    });

    if (prefsError) {
      console.error('Failed to create user preferences:', prefsError);
      // Non-critical, continue
    }

    // Create default categories
    const defaultCategories = [
      { name: 'General Notes', color: '#22d3ee', icon: '📝' },
      { name: 'Work', color: '#a78bfa', icon: '💼' },
      { name: 'Personal', color: '#60a5fa', icon: '👤' },
    ];

    const { error: categoriesError } = await supabase.from('categories').insert(
      defaultCategories.map((cat) => ({
        user_id: authData.user.id,
        ...cat,
      }))
    );

    if (categoriesError) {
      console.error('Failed to create default categories:', categoriesError);
      // Non-critical, continue
    }

    // Return success
    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username,
      },
      session: authData.session,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
