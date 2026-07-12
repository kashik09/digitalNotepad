/**
 * Analytics Stats API Route (db.json-backed)
 * GET aggregated analytics for the local user
 */

import { NextResponse } from 'next/server';
import { getCurrentUser, readDB } from '@/lib/jsondb';

export async function GET() {
  try {
    const user = await getCurrentUser();
    const db = await readDB();

    const notes = db.notes.filter((n) => n.user_id === user.id);
    const notes_total = notes.length;
    const notes_completed = notes.filter((n) => n.is_completed).length;

    let word_count = 0;
    let char_count = 0;
    notes.forEach((n) => {
      if (n.content) {
        word_count += n.content.trim().split(/\s+/).filter(Boolean).length;
        char_count += n.content.length;
      }
    });

    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const activity_timeline: Record<string, number> = {};
    db.analytics_events
      .filter((e) => e.user_id === user.id && new Date(e.created_at).getTime() >= cutoff)
      .forEach((e) => {
        const date = new Date(e.created_at).toISOString().split('T')[0];
        activity_timeline[date] = (activity_timeline[date] || 0) + 1;
      });

    const frequency: Record<string, number> = {};
    db.search_history
      .filter((s) => s.user_id === user.id)
      .forEach((s) => {
        frequency[s.query] = (frequency[s.query] || 0) + 1;
      });
    const top_searches = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([query, count]) => ({ query, count }));

    return NextResponse.json({
      notes_total,
      notes_completed,
      word_count,
      char_count,
      activity_timeline,
      top_searches,
    });
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
