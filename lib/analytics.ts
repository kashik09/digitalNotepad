/**
 * Analytics Utilities
 * Helper functions for event tracking
 */

export type AnalyticsEventType =
  | 'note_created'
  | 'note_updated'
  | 'note_deleted'
  | 'note_completed'
  | 'category_created'
  | 'category_updated'
  | 'category_deleted'
  | 'search_performed'
  | 'login'
  | 'logout'
  | 'session_start';

export interface EventMetadata {
  note_id?: string;
  category_id?: string;
  query?: string;
  results_count?: number;
  word_count?: number;
  char_count?: number;
  [key: string]: any;
}

/**
 * Track an analytics event
 */
export async function trackEvent(
  eventType: AnalyticsEventType,
  metadata: EventMetadata = {}
): Promise<void> {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        metadata,
      }),
    });
  } catch (error) {
    // Fail silently - don't disrupt user experience
    console.error('Analytics tracking failed:', error);
  }
}

/**
 * Get statistics for note content
 */
export function getNoteStats(content: string): {
  word_count: number;
  char_count: number;
  char_count_no_spaces: number;
  line_count: number;
} {
  const words = content.trim().split(/\s+/).filter(Boolean);
  const lines = content.split('\n');

  return {
    word_count: words.length,
    char_count: content.length,
    char_count_no_spaces: content.replace(/\s/g, '').length,
    line_count: lines.length,
  };
}

/**
 * Estimate reading time in minutes (average 200 words per minute)
 */
export function estimateReadingTime(content: string): number {
  const { word_count } = getNoteStats(content);
  return Math.ceil(word_count / 200);
}

/**
 * Track note creation
 */
export async function trackNoteCreated(noteId: string, categoryId?: string): Promise<void> {
  await trackEvent('note_created', { note_id: noteId, category_id: categoryId });
}

/**
 * Track note update with content stats
 */
export async function trackNoteUpdated(noteId: string, content: string): Promise<void> {
  const stats = getNoteStats(content);
  await trackEvent('note_updated', {
    note_id: noteId,
    ...stats,
  });
}

/**
 * Track note deletion
 */
export async function trackNoteDeleted(noteId: string): Promise<void> {
  await trackEvent('note_deleted', { note_id: noteId });
}

/**
 * Track note completion toggle
 */
export async function trackNoteCompleted(noteId: string, isCompleted: boolean): Promise<void> {
  await trackEvent('note_completed', {
    note_id: noteId,
    is_completed: isCompleted,
  });
}

/**
 * Track search query
 */
export async function trackSearch(query: string, resultsCount: number): Promise<void> {
  await trackEvent('search_performed', {
    query,
    results_count: resultsCount,
  });
}

/**
 * Track user login
 */
export async function trackLogin(): Promise<void> {
  await trackEvent('login');
}

/**
 * Track session start
 */
export async function trackSessionStart(): Promise<void> {
  await trackEvent('session_start');
}
