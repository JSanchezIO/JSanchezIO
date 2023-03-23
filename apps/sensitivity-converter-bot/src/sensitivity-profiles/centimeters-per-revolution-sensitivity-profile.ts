import { chain, divide, multiply } from 'mathjs';
import { Result } from '../result';

export class CentimetersPerRevolutionSensitivityProfile implements Domain.ISensitivityProfile {
  convertFromNormalizedSensitivity: Domain.ISensitivityProfile['convertFromNormalizedSensitivity'] =
    (countsPerInch, normalizedSensitivity) => {
      // cm/rev = 2.54 * 360 / (normalizedSensitivity * countsPerInch)

      const profileSensitivity = chain(360)
        .divide(multiply(normalizedSensitivity, countsPerInch))
        .multiply(2.54)
        .done();

      return Result.success(profileSensitivity);
    };

  convertToNormalizedSensitivity: Domain.ISensitivityProfile['convertToNormalizedSensitivity'] = (
    countsPerInch,
    profileSensitivity
  ) => {
    // normalizedSensitivity = 360 / ((in/rev / 2.54) * countsPerInch)

    const normalizedSensitivity = chain(360)
      .divide(multiply(divide(profileSensitivity, 2.54), countsPerInch))
      .done();

    return Result.success(normalizedSensitivity);
  };
}
