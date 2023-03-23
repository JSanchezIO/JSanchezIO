import { chain } from 'mathjs';
import { Result } from '../result';

export class DegreesPerMillimeterSensitivityProfile implements Domain.ISensitivityProfile {
  convertFromNormalizedSensitivity: Domain.ISensitivityProfile['convertFromNormalizedSensitivity'] =
    (countsPerInch, normalizedSensitivity) => {
      // deg/mm = (normalizedSensitivity * countsPerInch) / 25.4

      const profileSensitivity = chain(normalizedSensitivity)
        .multiply(countsPerInch)
        .divide(25.4)
        .done();

      return Result.success(profileSensitivity);
    };

  convertToNormalizedSensitivity: Domain.ISensitivityProfile['convertToNormalizedSensitivity'] = (
    countsPerInch,
    profileSensitivity
  ) => {
    // normalizedSensitivity = (deg/mm * 25.4) / countsPerInch

    const normalizedSensitivity = chain(profileSensitivity)
      .multiply(25.4)
      .divide(countsPerInch)
      .done();

    return Result.success(normalizedSensitivity);
  };
}
