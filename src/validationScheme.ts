// validationScheme.ts

const requiredSegmentsByType: Record<string,string[]> = {
  ORDERS:  ['UNH','BGM','DTM','NAD','LIN','QTY','UNS','CNT','UNT'],
  ORDRSP:  ['UNH','BGM','DTM','NAD','LIN','QTY','UNS','CNT','UNT'],
  DESADV:  ['UNH','BGM','DTM','NAD','CPS','LIN','QTY','UNS','CNT','UNT'],
  INVOIC:  ['UNH','BGM','DTM','NAD','LIN','QTY','PRI','UNS','UNT'],
};
  
  /**
   * Detect the EDI message type (e.g., ORDERS, ORDRSP, etc.) from segments
   */
  export function detectEdiType(segments: string[]): string | null {
    const unhSegment = segments.find(s => s.startsWith('UNH+'));
    if (!unhSegment) return null;
  
    const parts = unhSegment.split('+');
    const typeDetails = parts[2]?.split(':');
    const type = typeDetails?.[0];
  
    return type ?? null;
  }
  
  /**
   * Validate that all required segments are present for the detected message type
   */
  export function validateEdiStructure(segments: string[]): {
    valid: boolean;
    missing: string[];
    type: string | null;
  } {
    const type = detectEdiType(segments);
    if (!type) return { valid: false, missing: [], type: null };
  
    const required = requiredSegmentsByType[type];
    if (!required) return { valid: false, missing: [], type };
  
    const foundTags = segments.map(s => s.split('+')[0]);
    const missing = required.filter(req => !foundTags.includes(req));
  
    return {
      valid: missing.length === 0,
      missing,
      type,
    };
  }
  