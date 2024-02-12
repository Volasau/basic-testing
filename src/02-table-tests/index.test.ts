// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 100, b: 87, action: Action.Subtract, expected: 13 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 5, b: 10, action: Action.Multiply, expected: 50 },
  { a: 25, b: 4, action: Action.Multiply, expected: 100 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 40, b: 4, action: Action.Divide, expected: 10 },
  { a: 100, b: 20, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 6, b: 6, action: Action.Exponentiate, expected: 46656 },
  { a: 3, b: 2, action: 'q', expected: null },
  { a: 'q', b: 2, action: Action.Multiply, expected: null },
  { a: 3, b: 'q', action: Action.Subtract, expected: null },
  { a: 'w', b: 'q', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('bla-bla-bla', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
