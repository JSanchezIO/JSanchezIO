import { chain, multiply } from 'mathjs';
import { Result } from '../result';

export class InchesPerRevolutionSensitivityProfile implements Domain.ISensitivityProfile {
  convertFromNormalizedSensitivity: Domain.ISensitivityProfile['convertFromNormalizedSensitivity'] =
    (countsPerInch, normalizedSensitivity) => {
      // in/rev = 360 / (normalizedSensitivity * countsPerInch)

      const profileSensitivity = chain(360)
        .divide(countsPerInch)
        .divide(normalizedSensitivity)
        .done();

      return Result.success(profileSensitivity);
    };

  convertToNormalizedSensitivity: Domain.ISensitivityProfile['convertToNormalizedSensitivity'] = (
    countsPerInch,
    profileSensitivity
  ) => {
    // normalizedSensitivity = 360 / (in/rev * countsPerInch)

    const normalizedSensitivity = chain(360)
      .divide(multiply(profileSensitivity, countsPerInch))
      .done();

    return Result.success(normalizedSensitivity);
  };
}
