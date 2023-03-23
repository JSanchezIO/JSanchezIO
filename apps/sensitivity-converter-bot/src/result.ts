export class Result<TValue> {
  private readonly _errorMessage?: string;

  private readonly _isSuccess: boolean;

  private readonly _value?: TValue;

  private constructor(isSuccess: boolean, errorMessage?: string, value?: TValue) {
    this._errorMessage = errorMessage;
    this._isSuccess = isSuccess;
    this._value = value;
  }

  public get errorMessage() {
    if (this.isSuccess) {
      throw new Error('You may not access the error message of a successful result');
    }

    return this._errorMessage;
  }

  public get isFailure() {
    return !this._isSuccess;
  }

  public get isSuccess() {
    return this._isSuccess;
  }

  public get value() {
    if (this.isFailure) {
      throw new Error('You may not access the value of a failed result');
    }

    return this._value;
  }

  /**
   * Initializes a failure {@link Result Result} with no underlying value.
   * @param errorMessage A brief summary describing the cause of the failure {@link Result Result}.
   */
  public static failure<TValue = never>(errorMessage: string) {
    if (!errorMessage.trim()) {
      throw new Error('An error message is required');
    }

    return new Result<TValue>(false, errorMessage, undefined);
  }

  /**
   * Returns the underlying value if a success {@link Result Result};
   * Otherwise, an {@link Error} is thrown using {@link Result Result.errorMessage}.
   */
  public getValueOrThrow = (): TValue => {
    if (this.isSuccess) {
      return this._value as TValue;
    }

    throw new Error(this._errorMessage);
  };

  /**
   * Initializes a success {@link Result Result} with an underlying value.
   * @param value The underlying value of the success {@link Result Result}.
   */
  public static success<TValue>(value?: TValue) {
    return new Result<TValue>(true, undefined, value);
  }
}
