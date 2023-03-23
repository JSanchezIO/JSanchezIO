/* eslint-disable @typescript-eslint/no-explicit-any */

import { faker } from '@faker-js/faker';
import { convertSensitivites } from './convert-sensitivities';

describe('convert-sensitivities', () => {
  test('given an unsupported input sensitivity profile name then a failure result is returned', () => {
    const unsupportedInputSensitivityProfileName: any =
      'this is an unsupported sensitivity profile name';

    const actual = convertSensitivites(
      faker.datatype.number(),
      faker.datatype.number(),
      faker.datatype.number(),
      unsupportedInputSensitivityProfileName,
      'apexLegends'
    );

    expect(actual.isFailure).toBe(true);
    expect(actual.errorMessage).toMatchInlineSnapshot(
      '"The specified input profile, this is an unsupported sensitivity profile name, isn\'t supported."'
    );
  });

  test('given an unsupported output sensitivity profile name then a failure result is returned', () => {
    const unsupportedOutputSensitivityProfileName: any =
      'this is an unsupported sensitivity profile name';

    const actual = convertSensitivites(
      faker.datatype.number(),
      faker.datatype.number(),
      faker.datatype.number(),
      'apexLegends',
      unsupportedOutputSensitivityProfileName
    );

    expect(actual.isFailure).toBe(true);
    expect(actual.errorMessage).toMatchInlineSnapshot(
      '"The specified output profile, this is an unsupported sensitivity profile name, isn\'t supported."'
    );
  });

  test.each([
    [55, 'cmPerRev', 'inPerRev', 21.65354],
    [1, 'csgo', 'cmPerRev', 51.95455],
    [55, 'cmPerRev', 'csgo', 0.94463],
    [0.94463, 'csgo', 'valorant', 0.29688],
    [1, 'csgo', 'fortniteConfig', 0.0099],
  ])(
    'given valid inputs then it returns properly',
    (
      inputSensitivity: Domain.ProfileSensitivity,
      inputSensitivityProfileName: any,
      outputSensitivityProfileName: any,
      expected: Domain.ProfileSensitivity
    ) => {
      const actual = convertSensitivites(
        800,
        5,
        inputSensitivity,
        inputSensitivityProfileName,
        outputSensitivityProfileName
      );

      expect(actual.isSuccess).toBe(true);
      expect(actual.value).toBeCloseTo(expected, 5);
    }
  );
});
