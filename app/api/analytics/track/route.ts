/**
 * Analytics Tracking API Route (db.json-backed)
 * POST event tracking
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, trackEvent } from '@/lib/jsondb';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { event_type, metadata } = body;

    if (!event_type) {
      return NextResponse.json({ error: 'event_type is required' }, { status: 400 });
    }

    await trackEvent(user.id, event_type, metadata || {});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics track error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
