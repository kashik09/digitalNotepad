/**
 * Register API (single-user, db.json).
 *
 * The single local profile owns everything, so there is nothing to create.
 * Returns the local profile so any legacy caller keeps working. No cloud,
 * no passwords, no Supabase.
 */

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/jsondb';

export async function POST() {
  const user = await getCurrentUser();
  return NextResponse.json({ success: true, user });
}
