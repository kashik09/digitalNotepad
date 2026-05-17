/**
 * Analytics Tracking API Route
 * POST event tracking
 */

import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * POST /api/analytics/track
 * Track an analytics event
 */
export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { event_type, metadata } = body;

    if (!event_type) {
      return NextResponse.json({ error: 'event_type is required' }, { status: 400 });
    }

    const { error } = await supabase.from('analytics_events').insert({
      user_id: user.id,
      event_type,
      metadata: metadata || {},
    });

    if (error) {
      console.error('Error tracking event:', error);
      return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics track error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
