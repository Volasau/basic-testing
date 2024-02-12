// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 2, b: 2, action: Action.Add });
    expect(sum).toBe(4);
  });

  test('should subtract two numbers', () => {
    const sub = simpleCalculator({ a: 2, b: 2, action: Action.Subtract });
    expect(sub).toBe(0);
  });

  test('should multiply two numbers', () => {
    const mul = simpleCalculator({ a: 2, b: 2, action: Action.Multiply });
    expect(mul).toBe(4);
  });

  test('should divide two numbers', () => {
    const div = simpleCalculator({ a: 2, b: 2, action: Action.Divide });
    expect(div).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const exp = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(exp).toBe(4);
  });

  test('should return null for invalid action', () => {
    const invalidAction = simpleCalculator({
      a: 2,
      b: 2,
      action: 'q',
    });
    expect(invalidAction).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const invalidArgsA = simpleCalculator({
      a: 'q',
      b: 2,
      action: Action.Subtract,
    });
    expect(invalidArgsA).toBeNull();
    const invalidArgB = simpleCalculator({
      a: 2,
      b: 'q',
      action: Action.Multiply,
    });
    expect(invalidArgB).toBeNull();
    const invalidArgsAll = simpleCalculator({
      a: 'w',
      b: 'q',
      action: Action.Divide,
    });
    expect(invalidArgsAll).toBeNull();
  });
});
