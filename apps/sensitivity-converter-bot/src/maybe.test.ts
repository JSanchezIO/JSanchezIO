import { faker } from '@faker-js/faker';
import { Maybe } from './maybe';

type Nullable<TUnderlyingValue> = TUnderlyingValue | null | undefined;

describe('maybe', () => {
  describe('getValueOrDefault', () => {
    test.each([undefined, null])(
      "given a maybe with '%s' as the underlying value then the provided default value is returned",
      (invalidValue?: string | null) => {
        const expected = faker.datatype.string();

        const actual = Maybe.from<Nullable<string>>(invalidValue).getValueOrDefault(expected);

        expect(actual).toBe(expected);
      }
    );

    test('given a maybe with a valid underlying boolean value then the underlying value is returned', () => {
      const expected = faker.datatype.boolean();

      const actual = Maybe.from<Nullable<boolean>>(expected).getValueOrDefault(
        faker.datatype.boolean()
      );

      expect(actual).toBe(expected);
    });

    test('given a maybe with a valid underlying date value then the underlying value is returned', () => {
      const expected = faker.datatype.datetime();

      const actual = Maybe.from<Nullable<Date>>(expected).getValueOrDefault(
        faker.datatype.datetime()
      );

      expect(actual).toBe(expected);
    });

    test('given a maybe with a valid underlying number value then the underlying value is returned', () => {
      const expected = faker.datatype.number();

      const actual = Maybe.from<Nullable<number>>(expected).getValueOrDefault(
        faker.datatype.number()
      );

      expect(actual).toBe(expected);
    });

    test('given a maybe with a valid underlying string value then the underlying value is returned', () => {
      const expected = faker.datatype.string();

      const actual = Maybe.from<Nullable<string>>(expected).getValueOrDefault(
        faker.datatype.string()
      );

      expect(actual).toBe(expected);
    });
  });

  describe('getValueOrThrow', () => {
    test.each([undefined, null])(
      "given a maybe with '%s' as the underlying value then an error is thrown",
      (invalidValue?: string | null) => {
        const act = () => Maybe.from<Nullable<string>>(invalidValue).getValueOrThrow();

        expect(act).toThrowError('Maybe has no value.');
      }
    );

    test.each([undefined, null])(
      "given a maybe with '%s' as the underlying value when an error message is provided then an error is thrown with provided error message",
      (invalidValue?: string | null) => {
        const expectedErrorMessage = faker.lorem.sentence();

        const act = () =>
          Maybe.from<Nullable<string>>(invalidValue).getValueOrThrow(expectedErrorMessage);

        expect(act).toThrowError(expectedErrorMessage);
      }
    );

    test('given a maybe with a valid underlying boolean value then the underlying value is returned', () => {
      const expected = faker.datatype.boolean();

      const actual = Maybe.from<Nullable<boolean>>(expected).getValueOrThrow();

      expect(actual).toBe(expected);
    });

    test('given a maybe with a valid underlying date value then the underlying value is returned', () => {
      const expected = faker.datatype.datetime();

      const actual = Maybe.from<Nullable<Date>>(expected).getValueOrThrow();

      expect(actual).toBe(expected);
    });

    test('given a maybe with a valid underlying number value then the underlying value is returned', () => {
      const expected = faker.datatype.number();

      const actual = Maybe.from<Nullable<number>>(expected).getValueOrThrow();

      expect(actual).toBe(expected);
    });

    test('given a maybe with a valid underlying string value then the underlying value is returned', () => {
      const expected = faker.datatype.string();

      const actual = Maybe.from<Nullable<string>>(expected).getValueOrThrow();

      expect(actual).toBe(expected);
    });
  });
});
