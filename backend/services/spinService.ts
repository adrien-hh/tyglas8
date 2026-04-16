import { CONFIG } from "../config";
import { IReward, ISpinResult } from "../types";
import { LogService } from "./logService";
import { RewardService } from "./rewardService";

export class SpinService {
  static async executeSpin(
    selectAndDecrement: boolean = true,
  ): Promise<ISpinResult> {
    const rewards = await RewardService.getAvailableRewards();

    const reward = selectAndDecrement
      ? await RewardService.selectRewardAndDecrement(rewards)
      : await RewardService.selectReward(rewards);

    const symbol = this.generateSpinResult(reward);

    await LogService.logResult(symbol);

    // Générer une durée de spin aléatoire
    const spinDuration =
      CONFIG.MIN_SPIN_DURATION +
      Math.random() * (CONFIG.MAX_SPIN_DURATION - CONFIG.MIN_SPIN_DURATION);

    return {
      symbol: reward ? reward.symbol : "perdu",
      spinDuration: Math.round(spinDuration),
    };
  }

  static generateSpinResult(resultReward: IReward | null): string {
    if (resultReward) {
      return resultReward.symbol;
    }

    return "perdu";
  }

  static getGameConfig() {
    return {
      symbols: CONFIG.SYMBOLS,
      minSpinDuration: CONFIG.MIN_SPIN_DURATION,
      maxSpinDuration: CONFIG.MAX_SPIN_DURATION,
    };
  }
}
