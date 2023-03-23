import { faker } from '@faker-js/faker';
import { divide, pi } from 'mathjs';
import { GameSensitivityProfile } from './game-sensitivity-profile';

class MockGameSensitivityProfile extends GameSensitivityProfile {
  public constructor(yaw: number) {
    super(yaw);
  }
}

describe('game-sensitivity-profile', () => {
  describe('convertFromNormalizedSensitivity', () => {
    test.each([[0.022], [0.0066], [2.222], [0.5555], [divide(0.018, pi)], [0.0066], [0.07]])(
      "given a yaw of '%s' then it returns '1'",
      (yaw: number) => {
        const target = new MockGameSensitivityProfile(yaw);

        const actual = target.convertFromNormalizedSensitivity(faker.datatype.number(), yaw);

        expect(actual.isSuccess).toBe(true);
        expect(actual.value).toBe(1);
      }
    );
  });

  describe('convertToNormalizedSensitivity', () => {
    test.each([[0.022], [0.0066], [2.222], [0.5555], [divide(0.018, pi)], [0.0066], [0.07]])(
      "given '1' then it returns '%s'",
      (yaw: number) => {
        const target = new MockGameSensitivityProfile(yaw);

        const actual = target.convertToNormalizedSensitivity(faker.datatype.number(), 1);

        expect(actual.isSuccess).toBe(true);
        expect(actual.value).toBe(yaw);
      }
    );
  });
});
