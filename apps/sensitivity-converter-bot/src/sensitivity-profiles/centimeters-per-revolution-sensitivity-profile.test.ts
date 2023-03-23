import { CentimetersPerRevolutionSensitivityProfile } from './centimeters-per-revolution-sensitivity-profile';

describe('centimeters-per-revolution-sensitivity-profile', () => {
  test.each([
    [800, 0.0066, 173.181818181818],
    [800, 0.5555, 2.05760576057606],
    [800, 0.022, 51.9545454545455],
  ])(
    'converts from normalized sensitivity',
    (countsPerInch: number, normalizedSensitivity: number, expectedResult: number) => {
      const target = new CentimetersPerRevolutionSensitivityProfile();

      const result = target.convertFromNormalizedSensitivity(countsPerInch, normalizedSensitivity);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeCloseTo(expectedResult, 4);
    }
  );

  test.each([
    [800, 173.181818181818, 0.0066],
    [800, 2.05760576057606, 0.5555],
    [800, 51.9545454545455, 0.022],
  ])(
    'converts to normalized sensitivity',
    (countsPerInch: number, measurementSensitivity: number, expectedResult: number) => {
      const target = new CentimetersPerRevolutionSensitivityProfile();

      const result = target.convertToNormalizedSensitivity(countsPerInch, measurementSensitivity);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeCloseTo(expectedResult, 4);
    }
  );
});
