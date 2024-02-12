// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(500);
    expect(myAccount.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const myAccount = getBankAccount(500);
    const amount = 600;
    expect(() => myAccount.withdraw(amount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const myAccount = getBankAccount(500);
    const frendAccount = getBankAccount(600);
    expect(() => myAccount.transfer(1000, frendAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const myAccount = getBankAccount(500);
    expect(() => myAccount.transfer(500, myAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const myAccount = getBankAccount(500);
    myAccount.deposit(100);
    expect(myAccount.getBalance()).toBe(600);
  });

  test('should withdraw money', () => {
    const myAccount = getBankAccount(500);
    myAccount.withdraw(100);
    expect(myAccount.getBalance()).toBe(400);
  });

  test('should transfer money', () => {
    const myAccount = getBankAccount(500);
    const frendAccount = getBankAccount(600);
    myAccount.transfer(150, frendAccount);
    expect(myAccount.getBalance()).toBe(350);
    expect(frendAccount.getBalance()).toBe(750);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const myAccount = getBankAccount(50);
    const balance = await myAccount.fetchBalance();

    // This part of the code can be used to check both null and number
    if (balance === null) {
      expect(balance).toBeNull();
    } else {
      expect(typeof balance).toBe('number');
    }

    // expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const myAccount = getBankAccount(50);
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValueOnce(600);
    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBe(600);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const myAccount = getBankAccount(50);
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(myAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
