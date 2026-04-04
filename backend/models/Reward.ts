import mongoose, { Document } from 'mongoose';
import { IReward } from '../types';

interface IRewardDocument extends Omit<IReward, '_id'>, Document {}

const rewardsSchema = new mongoose.Schema<IRewardDocument>({
    combination: { type: String, required: true },
    reward: { type: String, required: true },
    quantity: { type: Number, required: true },
    weight: { type: Number, required: true }
});

export default mongoose.model<IRewardDocument>('Reward', rewardsSchema);
