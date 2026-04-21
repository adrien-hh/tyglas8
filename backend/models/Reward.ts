import mongoose, { Document } from "mongoose";
import { IReward } from "../types";

interface IRewardDocument extends Omit<IReward, "_id">, Document {}

const rewardsSchema = new mongoose.Schema<IRewardDocument>({
  symbol: {
    type: String,
    required: true,
    enum: ["biere", "cafe", "volant", "crepe", "figurine", "banane", "perdu"],
  },
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true },
});

export default mongoose.model<IRewardDocument>("Reward", rewardsSchema);
