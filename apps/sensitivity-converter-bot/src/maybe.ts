const isValueDefined = <TValue>(value: TValue): value is NonNullable<TValue> => {
  return value !== undefined && value !== null;
};

export class Maybe<TValue> {
  private constructor(private readonly _value: TValue) {}

  public get hasNoValue(): boolean {
    return !isValueDefined(this._value);
  }

  public get value(): NonNullable<TValue> {
    if (isValueDefined(this._value)) {
      return this._value;
    }

    throw new Error('Maybe has no value.');
  }

  /**
   * Initializes a {@link Maybe} with provided value.
   * @param value The underlying value of the constructed {@link Maybe}.
   */
  public static from = <TMaybeValue>(value: TMaybeValue): Maybe<TMaybeValue> => {
    return new Maybe<TMaybeValue>(value);
  };

  /**
   * Returns the underlying value if not `null` or `undefined`;
   * Otherwise, the provided default value is returned.
   * @param defaultValue The value to return if the underlying value is `null` or `undefined`.
   */
  public getValueOrDefault = (defaultValue: NonNullable<TValue>): NonNullable<TValue> => {
    if (isValueDefined(this._value)) {
      return this._value;
    }

    return defaultValue;
  };

  /**
   * Returns the underlying value if not `null` or `undefined`;
   * Otherwise, an {@link Error} is thrown using the provided error message.
   * @param errorMessage The message to populate the {@link Error} with when the underlying
   * value is `null` or `undefined`.
   */
  public getValueOrThrow = (errorMessage = 'Maybe has no value.'): NonNullable<TValue> => {
    if (isValueDefined(this._value)) {
      return this._value;
    }

    throw new Error(errorMessage);
  };
}
