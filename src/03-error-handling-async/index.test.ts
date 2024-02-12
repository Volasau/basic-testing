// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const text = 'bla bla bla';
    const number = 1982;
    const returnText = await resolveValue(text);
    const returnNumber = await resolveValue(number);
    expect(returnText).toBe(text);
    expect(returnNumber).toBe(number);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const myMessage = 'bla bla bla';
    expect(() => throwError(myMessage)).toThrow(myMessage);
    expect(() => throwError()).toThrow('Oops!');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
