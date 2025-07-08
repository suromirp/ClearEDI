import { messageTypeMap } from './messageTypes';

export function detectEdiType(segments: string[]): string | null {
  const unhSegment = segments.find(s => s.startsWith('UNH+'));
  if (!unhSegment) return null;

  const parts = unhSegment.split('+');
  const typeDetails = parts[2]?.split(':');
  const rawType = typeDetails?.[0];

  // Gebruik de mapping als fallback
  return messageTypeMap[rawType ?? ''] ?? rawType ?? null;
}