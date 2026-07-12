/**
 * Admin Users API (single-user, db.json).
 *
 * Returns the local profile(s) from db.json. No Supabase, no service role.
 */

import { NextResponse } from 'next/server';
import { readDB } from '@/lib/jsondb';

export async function GET() {
  try {
    const db = await readDB();
    const users = db.profiles.map((p) => ({
      id: p.id,
      username: p.username,
      is_admin: p.is_admin,
      use_pin: p.use_pin,
      created_at: p.created_at,
      updated_at: p.updated_at,
      disabled_at: p.disabled_at,
      email: null,
    }));
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Admin users GET error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
