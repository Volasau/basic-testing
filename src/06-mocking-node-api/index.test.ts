// Uncomment the code below and write your tests
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');
    const myFunction = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(myFunction, timeout);
    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenCalledWith(myFunction, timeout);
  });

  test('should call callback only after timeout', () => {
    const myFunction = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(myFunction, timeout);
    expect(myFunction).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(myFunction).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalMock = jest.spyOn(global, 'setInterval');
    const myFunction = jest.fn();
    const timeout = 1000;
    doStuffByInterval(myFunction, timeout);
    expect(setIntervalMock).toHaveBeenCalledTimes(1);
    expect(setIntervalMock).toHaveBeenCalledWith(myFunction, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const myFunction = jest.fn();
    const timeout = 1000;
    doStuffByInterval(myFunction, timeout);
    expect(myFunction).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(myFunction).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout);
    expect(myFunction).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    const pathToFile = './index.ts';
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('./index');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve('File content'));
    const result = await readFileAsynchronously('./index');

    expect(result).toBe('File content');
  });
});
