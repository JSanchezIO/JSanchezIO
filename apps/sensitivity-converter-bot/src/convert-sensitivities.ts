import { round } from 'mathjs';
import { Maybe } from './maybe';
import { Result } from './result';
import {
  ApexLegendsGameSensitivityProfile,
  CentimetersPerRevolutionSensitivityProfile,
  CodModernWarfareGameSensitivityProfile,
  CsgoGameSensitivityProfile,
  DegreesPerMillimeterSensitivityProfile,
  FortniteConfigGameSensitivityProfile,
  FortniteSliderGameSensitivityProfile,
  InchesPerRevolutionSensitivityProfile,
  OverwatchGameSensitivityProfile,
  QuakeGameSensitivityProfile,
  RainbowSixSiegeGameSensitivityProfile,
  ReflexGameSensitivityProfile,
  SourceGameSensitivityProfile,
  ValorantGameSensitivityProfile,
} from './sensitivity-profiles';

/**
 * This a mapping of sensitivity profiles and their lookup keys.
 */
const supportedSensitivityProfiles = {
  apexLegends: new ApexLegendsGameSensitivityProfile(),
  cmPerRev: new CentimetersPerRevolutionSensitivityProfile(),
  codModernWarfare: new CodModernWarfareGameSensitivityProfile(),
  csgo: new CsgoGameSensitivityProfile(),
  degPerMm: new DegreesPerMillimeterSensitivityProfile(),
  fortniteConfig: new FortniteConfigGameSensitivityProfile(),
  fortniteSlider: new FortniteSliderGameSensitivityProfile(),
  inPerRev: new InchesPerRevolutionSensitivityProfile(),
  overwatch: new OverwatchGameSensitivityProfile(),
  quake: new QuakeGameSensitivityProfile(),
  reflex: new ReflexGameSensitivityProfile(),
  siege: new RainbowSixSiegeGameSensitivityProfile(),
  source: new SourceGameSensitivityProfile(),
  valorant: new ValorantGameSensitivityProfile(),
} as const;

/**
 * The names of the supported sensitivity profiles.
 */
export type SupportedSensitivityProfileName = keyof typeof supportedSensitivityProfiles;

/**
 *
 * @param countsPerInch The target mouse's {@link Domain.CountsPerInch Counts/Inch}.
 * @param decimals The number of decimal places, between 0 - 15, to round the output to.
 * @param inputSensitivity The sensitivity value according to the specified `inputSensitivityProfileName`.
 * @param inputSensitivityProfileName The {@link SupportedSensitivityProfileName Sensitivity Profile Name} from which the input sensitivity value was taken from.
 * @param outputSensitivityProfileName The {@link SupportedSensitivityProfileName Sensitivity Profile Name} to convert the `inputSensitivity` to.
 */
export const convertSensitivites = (
  countsPerInch: Domain.CountsPerInch,
  decimals: number,
  inputSensitivity: Domain.ProfileSensitivity,
  inputSensitivityProfileName: SupportedSensitivityProfileName,
  outputSensitivityProfileName: SupportedSensitivityProfileName
): Result<Domain.ProfileSensitivity> => {
  const maybeInputSensitivityProfile = Maybe.from<Domain.ISensitivityProfile>(
    supportedSensitivityProfiles[inputSensitivityProfileName]
  );

  if (maybeInputSensitivityProfile.hasNoValue) {
    return Result.failure<Domain.ProfileSensitivity>(
      `The specified input profile, ${inputSensitivityProfileName}, isn't supported.`
    );
  }

  const inputSensitivityProfile = maybeInputSensitivityProfile.value;

  const maybeOutputSensitivityProfile = Maybe.from<Domain.ISensitivityProfile>(
    supportedSensitivityProfiles[outputSensitivityProfileName]
  );

  if (maybeOutputSensitivityProfile.hasNoValue) {
    return Result.failure<Domain.ProfileSensitivity>(
      `The specified output profile, ${outputSensitivityProfileName}, isn't supported.`
    );
  }

  const outputSensitivityProfile = maybeOutputSensitivityProfile.value;

  const normalizedSensitivity = inputSensitivityProfile
    .convertToNormalizedSensitivity(countsPerInch, inputSensitivity)
    .getValueOrThrow();

  const outputSensitivity = outputSensitivityProfile
    .convertFromNormalizedSensitivity(countsPerInch, normalizedSensitivity)
    .getValueOrThrow();

  return Result.success<Domain.ProfileSensitivity>(round(outputSensitivity, decimals));
};
