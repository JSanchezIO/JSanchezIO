import { DegreesPerMillimeterSensitivityProfile } from './degrees-per-millimeter-sensitivity-profile';

describe('degrees-per-millimeter-sensitivity-profile', () => {
  test.each([
    [800, 0.0066, 0.207874015748032],
    [800, 0.5555, 17.496062992126],
    [800, 0.022, 0.692913385826772],
  ])(
    'converts from true sensitivity',
    (countsPerInch: number, normalizedSensitivity: number, expectedResult: number) => {
      const measurementProfile = new DegreesPerMillimeterSensitivityProfile();

      const result = measurementProfile.convertFromNormalizedSensitivity(
        countsPerInch,
        normalizedSensitivity
      );

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeCloseTo(expectedResult, 4);
    }
  );

  test.each([
    [800, 0.207874015748032, 0.0066],
    [800, 17.496062992126, 0.5555],
    [800, 0.692913385826772, 0.022],
  ])(
    'converts to true sensitivity',
    (countsPerInch: number, normalizedSensitivity: number, expectedResult: number) => {
      const measurementProfile = new DegreesPerMillimeterSensitivityProfile();

      const result = measurementProfile.convertToNormalizedSensitivity(
        countsPerInch,
        normalizedSensitivity
      );

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeCloseTo(expectedResult, 4);
    }
  );
});
