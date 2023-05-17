export type ValidationErrorPayload = {
  expected: string;
  received: string;
  key?: string;
  parentKeys?: string[];
  convertFailed?: boolean;
};
