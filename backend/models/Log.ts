import mongoose, { Document } from "mongoose";
import { ILog } from "../types";

interface ILogDocument extends Omit<ILog, "_id">, Document {}

const logSchema = new mongoose.Schema<ILogDocument>({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  result: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ILogDocument>("Log", logSchema);