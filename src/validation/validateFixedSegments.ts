import { allowedCodes } from "./allowedCodes";

export function validateFixedSegment(
  segment: string,
  context?: { messageType?: string }
): true | string {
  const [tag] = segment.split('+');
  const messageType = context?.messageType ?? 'UNKNOWN';

  const codeSet = allowedCodes[messageType]?.[tag];
  const expected = codeSet?.__expected__;

  // ✅ bescherm jezelf tegen undefined
  if (!codeSet || !expected) return true;

  const actual = segment.replace(`${tag}+`, '');
  if (actual !== expected) {
    const [p1, p2, p3] = expected.split(':');

    return `Invalid ${tag} segment: received '${segment}', expected '${tag}+${expected}'.
Explanation:
- ${p1} = ${codeSet[p1] ?? '(unknown)'}
- ${p2} = ${codeSet[p2] ?? '(unknown)'}
- ${p3} = ${codeSet[p3] ?? '(unknown)'}`;
  }

  return true;
}