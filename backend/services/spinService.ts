import { CONFIG } from "../config";
import { IReward, ISpinResult, SymbolType } from "../types";
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

    const logService = new LogService(CONFIG.LOG_PATH);
    logService.logResult(reward);

    const combination = this.generateSpinResult(reward, CONFIG.SYMBOLS);

    // Générer une durée de spin aléatoire
    const spinDuration =
      CONFIG.MIN_SPIN_DURATION +
      Math.random() * (CONFIG.MAX_SPIN_DURATION - CONFIG.MIN_SPIN_DURATION);

    return {
      combination: combination,
      prize: reward ? reward.combination : "perdu",
      spinDuration: Math.round(spinDuration),
    };
  }

  static generateSpinResult(
    resultReward: IReward | null,
    symbols: SymbolType[],
  ): SymbolType[] {
    if (resultReward && resultReward.combination !== "perdu") {
      return [resultReward.combination as SymbolType];
    }

    const combination = symbols[Math.floor(Math.random() * symbols.length)];
    return [combination];
  }

  static getGameConfig() {
    return {
      symbols: CONFIG.SYMBOLS,
      minSpinDuration: CONFIG.MIN_SPIN_DURATION,
      maxSpinDuration: CONFIG.MAX_SPIN_DURATION,
    };
  }
}
