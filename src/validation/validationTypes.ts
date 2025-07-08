// validationTypes.ts
export interface ValidationRule {
    segment: string;
    mandatory?: boolean;
    condition?: (segments: string[]) => boolean;
  }
  