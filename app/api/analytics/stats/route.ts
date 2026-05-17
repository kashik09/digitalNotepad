/**
 * Analytics Stats API Route
 * GET user analytics
 */

import { createServerClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * GET /api/analytics/stats
 * Get aggregated analytics for the authenticated user
 */
export async function GET() {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all stats in parallel
    const [notesResult, activityResult, searchResult] = await Promise.all([
      // Notes stats
      supabase
        .from('notes')
        .select('id, is_completed, content')
        .eq('user_id', user.id),

      // Activity timeline (last 30 days)
      supabase
        .from('analytics_events')
        .select('event_type, created_at')
        .eq('user_id', user.id)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false }),

      // Top searches
      supabase
        .from('search_history')
        .select('query, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    // Calculate notes stats
    const notes = notesResult.data || [];
    const notesTotal = notes.length;
    const notesCompleted = notes.filter((n) => n.is_completed).length;

    // Calculate word/char counts
    let totalWords = 0;
    let totalChars = 0;

    notes.forEach((note) => {
      if (note.content) {
        const words = note.content.trim().split(/\s+/).filter(Boolean);
        totalWords += words.length;
        totalChars += note.content.length;
      }
    });

    // Group activity by date
    const activityByDate: Record<string, number> = {};
    (activityResult.data || []).forEach((event) => {
      const date = new Date(event.created_at).toISOString().split('T')[0];
      activityByDate[date] = (activityByDate[date] || 0) + 1;
    });

    // Count search frequency
    const searchFrequency: Record<string, number> = {};
    (searchResult.data || []).forEach((search) => {
      searchFrequency[search.query] = (searchFrequency[search.query] || 0) + 1;
    });

    const topSearches = Object.entries(searchFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([query, count]) => ({ query, count }));

    return NextResponse.json({
      notes_total: notesTotal,
      notes_completed: notesCompleted,
      word_count: totalWords,
      char_count: totalChars,
      activity_timeline: activityByDate,
      top_searches: topSearches,
    });
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
