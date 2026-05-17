/**
 * Login API Route
 * Handles Supabase authentication + PIN verification
 */

import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, pin } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    } 

    const supabase = createServerClient();

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Get user profile to check PIN requirement
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username, use_pin, pin_hash, disabled_at')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Check if account is disabled
    if (profile.disabled_at) {
      return NextResponse.json(
        { error: 'Account has been disabled' },
        { status: 403 }
      );
    }

    // Verify PIN if enabled
    if (profile.use_pin) {
      if (!pin) {
        return NextResponse.json(
          { error: 'PIN is required' },
          { status: 400 }
        );
      }

      if (!profile.pin_hash) {
        return NextResponse.json(
          { error: 'PIN configuration error' },
          { status: 500 }
        );
      }

      const pinValid = await bcrypt.compare(pin, profile.pin_hash);
      if (!pinValid) {
        return NextResponse.json(
          { error: 'Invalid PIN' },
          { status: 401 }
        );
      }
    }

    // Success - return user data and session
    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: profile.username,
      },
      session: authData.session,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
