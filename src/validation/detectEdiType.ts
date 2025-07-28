import { messageTypeMap } from './messageTypes';

export function detectEdiType(segments: string[]): string {
  const unhSegment = segments.find(s => s.startsWith('UNH+'));
  if (!unhSegment) return 'UNKNOWN';

  const parts = unhSegment.split('+');
  const typeDetails = parts[2]?.split(':');
  const rawType = typeDetails?.[0] ?? '';

  // Altijd string retourneren — fallback is 'UNKNOWN'
  return (messageTypeMap[rawType] ?? rawType) || 'UNKNOWN';
}
