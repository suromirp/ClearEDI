export function parseSegments(ediText: string): string[] {
    return ediText
      .split(/'/) // Split the segment
      .map(s => s.trim())
      .filter(Boolean);
  } 