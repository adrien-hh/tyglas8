import { RewardRepository } from '../repositories/RewardRepository';
import { IReward } from '../types';

export class RewardService {
    static async getAvailableRewards(): Promise<IReward[]> {
        return await RewardRepository.findAvailable();
    }

    static generateReward(rewards: IReward[]): IReward | null {
        const availableRewards = rewards.filter(reward => reward.quantity > 0);
        const totalWeight = availableRewards.reduce((sum, reward) => sum + reward.weight, 0);
        const limit = Math.random() * totalWeight;

        let cumulative = 0;
        for (let reward of availableRewards) {
            cumulative += reward.weight;
            if (limit <= cumulative) return reward;
        }
        return null;
    }

    static async selectRewardAndDecrement(rewards: IReward[]): Promise<IReward | null> {
        while (rewards.length > 0) {
            const reward = this.generateReward(rewards);
            if (!reward) return null;

            const updatedReward = await RewardRepository.decrementQuantity(reward._id!.toString());

            if (updatedReward) {
                return updatedReward;
            }

            // Remove the reward from the list if quantity was 0
            rewards = rewards.filter(r => r._id !== reward._id);
        }
        return null;
    }

    static async selectReward(rewards: IReward[]): Promise<IReward | null> {
        return this.generateReward(rewards);
    }
}