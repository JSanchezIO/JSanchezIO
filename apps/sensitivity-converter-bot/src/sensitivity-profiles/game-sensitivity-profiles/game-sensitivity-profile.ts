import { divide, multiply } from 'mathjs';
import { Result } from '../../result';

export abstract class GameSensitivityProfile implements Domain.ISensitivityProfile {
  protected constructor(private readonly _yaw: number) {}

  convertFromNormalizedSensitivity: Domain.ISensitivityProfile['convertFromNormalizedSensitivity'] =
    (_, normalizedSensitivity) => {
      const profileSensitivity = divide(normalizedSensitivity, this._yaw);

      return Result.success(profileSensitivity);
    };

  convertToNormalizedSensitivity: Domain.ISensitivityProfile['convertToNormalizedSensitivity'] = (
    _,
    profileSensitivity
  ) => {
    const normalizedSensitivity = multiply(this._yaw, profileSensitivity);

    return Result.success(normalizedSensitivity);
  };
}
