import Reward from "../models/Reward";
import { IReward } from "../types";

export class RewardRepository {
  static async findAvailable(): Promise<IReward[]> {
    return await Reward.find({ quantity: { $gt: 0 } });
  }

  static async findAll(): Promise<IReward[]> {
    return await Reward.find();
  }

  static async findById(id: string): Promise<IReward | null> {
    return await Reward.findById(id);
  }

  static async findByCombination(combination: string): Promise<IReward | null> {
    return await Reward.findOne({ combination });
  }

  static async decrementQuantity(rewardId: string): Promise<IReward | null> {
    return await Reward.findOneAndUpdate(
      { _id: rewardId, quantity: { $gt: 0 } },
      { $inc: { quantity: -1 } },
      { new: true },
    );
  }

  static async incrementQuantity(
    rewardId: string,
    amount: number = 1,
  ): Promise<IReward | null> {
    return await Reward.findByIdAndUpdate(
      rewardId,
      { $inc: { quantity: amount } },
      { new: true },
    );
  }

  static async create(rewardData: Omit<IReward, "_id">): Promise<IReward> {
    const reward = new Reward(rewardData);
    return (await reward.save()).toObject() as IReward;
  }

  static async update(
    id: string,
    updateData: Partial<IReward>,
  ): Promise<IReward | null> {
    return await Reward.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async delete(id: string): Promise<IReward | null> {
    return await Reward.findByIdAndDelete(id);
  }

  static async resetAllQuantities(defaultQuantity: number = 1): Promise<any> {
    return await Reward.updateMany({}, { quantity: defaultQuantity });
  }

  static async deleteAll(): Promise<any> {
    return await Reward.deleteMany({});
  }
}
