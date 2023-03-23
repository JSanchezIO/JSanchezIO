import { InchesPerRevolutionSensitivityProfile } from './inches-per-revolution-sensitivity-profile';

describe('inches-per-revolution-sensitivity-profile', () => {
  test.each([
    [800, 0.0066, 68.1818181818182],
    [800, 0.5555, 0.81008100810081],
    [800, 0.022, 20.4545454545455],
  ])(
    'converts from normalized sensitivity',
    (countsPerInch: number, normalizedSensitivity: number, expectedResult: number) => {
      const target = new InchesPerRevolutionSensitivityProfile();

      const result = target.convertFromNormalizedSensitivity(countsPerInch, normalizedSensitivity);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeCloseTo(expectedResult, 4);
    }
  );

  test.each([
    [800, 68.1818181818182, 0.0066],
    [800, 0.81008100810081, 0.5555],
    [800, 20.4545454545455, 0.022],
  ])(
    'converts to normalized sensitivity',
    (countsPerInch: number, measurementSensitivity: number, expectedResult: number) => {
      const target = new InchesPerRevolutionSensitivityProfile();

      const result = target.convertToNormalizedSensitivity(countsPerInch, measurementSensitivity);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeCloseTo(expectedResult, 4);
    }
  );
});
