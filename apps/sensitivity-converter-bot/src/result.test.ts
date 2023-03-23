import { faker } from '@faker-js/faker';
import { Result } from './result';

describe('result', () => {
  describe('failure', () => {
    test('then a valid failure result is returned', () => {
      const expectedErrorMessage = faker.lorem.sentence();
      const actual = Result.failure(expectedErrorMessage);

      expect(actual.isFailure).toBe(true);
      expect(actual.isSuccess).toBe(false);
      expect(actual.errorMessage).toBe(expectedErrorMessage);
      expect(() => actual.value).toThrowErrorMatchingInlineSnapshot(
        '"You may not access the value of a failed result"'
      );
    });
  });

  describe('success', () => {
    test('then a valid success result is returned', () => {
      const expectedValue = faker.datatype.string();
      const actual = Result.success(expectedValue);

      expect(actual.isFailure).toBe(false);
      expect(actual.isSuccess).toBe(true);
      expect(() => actual.errorMessage).toThrowErrorMatchingInlineSnapshot(
        '"You may not access the error message of a successful result"'
      );
      expect(actual.value).toBe(expectedValue);
    });
  });
});
