import { divide, pi } from 'mathjs';
import { GameSensitivityProfile } from './game-sensitivity-profile';

export class RainbowSixSiegeGameSensitivityProfile extends GameSensitivityProfile {
  public constructor() {
    super(divide(0.018, pi));
  }
}
