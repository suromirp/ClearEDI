// validationTypes.ts
export interface ValidationRule {
  segment: string;
  mandatory?: boolean;
  condition?: (segments: string[]) => boolean;
  validate?: (segment: string, context?: { messageType?: string }) => true | string;
}
