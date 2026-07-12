/**
 * Login API (single-user, db.json).
 *
 * Real auth is handled client-side (see app/login/page.jsx, localStorage).
 * This endpoint just returns the local profile so any legacy caller keeps
 * working. No cloud, no passwords, no Supabase.
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/jsondb';

export async function POST() {
  const user = await getCurrentUser();
  return NextResponse.json({ success: true, user });
}
