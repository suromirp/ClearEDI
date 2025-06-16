export function parseSegments(ediText: string): string[] {
    return ediText
      .split(/'/) // Splits op het segment-separator teken (typisch een apostrof)
      .map(s => s.trim())
      .filter(Boolean);
  } 