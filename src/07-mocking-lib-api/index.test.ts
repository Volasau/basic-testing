// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    const baseURL = 'https://jsonplaceholder.typicode.com';
    await throttledGetDataFromApi('/posts/1');
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const result = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();
    expect(result).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const response = [{ id: 1, title: 'Test Post' }];
    const axiosGet = Promise.resolve({ data: response });
    jest.spyOn(axios.Axios.prototype, 'get').mockReturnValue(axiosGet);
    const result = await throttledGetDataFromApi('/posts/1');
    jest.runAllTimers();
    expect(result).toEqual(response);
  });
});
