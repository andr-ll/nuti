import { BasicTypes, NodeTypes } from './literals';

type Expected = BasicTypes | 'object' | 'array';
type Received = NodeTypes | 'missing';

export type ValidationErrorPayload = {
  expected: Expected;
  received: Received;
  key?: string;
  parentKeys?: string[];
  convertFailed?: boolean;
};
