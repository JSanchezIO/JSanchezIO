/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Result } from './result';

declare global {
  namespace Domain {
    interface ISensitivityProfile {
      /**
       * Converts a {@link Domain.NormalizedSensitivity Normalized Sensitivity} to
       * its {@link Domain.ProfileSensitivity Profile Sensitivity} value as specified
       * by this {@link Domain.ISensitivityProfile Sensitivity Profile}.
       * @param countsPerInch {@link Domain.CountsPerInch Counts/Inch}
       * @param normalizedSensitivity {@link Domain.NormalizedSensitivity Normalized Sensitivity}
       */
      convertFromNormalizedSensitivity: (
        countsPerInch: Domain.CountsPerInch,
        normalizedSensitivity: Domain.NormalizedSensitivity
      ) => Result<Domain.ProfileSensitivity>;

      /**
       * Converts a {@link Domain.ProfileSensitivity Profile Sensitivity} to
       * its {@link Domain.NormalizedSensitivity Normalized Sensitivity} value.
       * @param countsPerInch {@link Domain.CountsPerInch Counts/Inch}
       * @param profileSensitivity {@link Domain.ProfileSensitivity Profile Sensitivity}
       */
      convertToNormalizedSensitivity: (
        countsPerInch: Domain.CountsPerInch,
        profileSensitivity: Domain.ProfileSensitivity
      ) => Result<Domain.NormalizedSensitivity>;
    }

    /**
     * Incorrectly referred to as DPI, or dots/inch,
     * the CPI or counts per inch refers to the number of steps the mouse
     * will report when moving an inch.
     */
    type CountsPerInch = number;

    /**
     * A sensitivity value that can be used to convert between
     * {@link ISensitivityProfile Sensitivity Profiles}.
     */
    type NormalizedSensitivity = number;

    /**
     * A sensitivity value translated for a {@link ISensitivityProfile Sensitivity Profile}.
     */
    type ProfileSensitivity = number;
  }

  namespace Infrastructure {
    interface ILoggingService {
      /**
       * Logs an error
       */
      error: (message: any, ...optionalParams: any[]) => void;

      /**
       * Logs an informational mesage
       */
      info: (message: any, ...optionalParams: any[]) => void;

      /**
       * Logs a message
       */
      log: (message: any, ...optionalParams: any[]) => void;

      /**
       * Logs a warning message
       */
      warn: (message: any, ...optionalParams: any[]) => void;
    }
  }
}
