import "dotenv/config";
import mongoose from "mongoose";
import { RewardRepository } from "./repositories/RewardRepository";

// Samedi
const REWARDS_DATA = [
  { symbol: "biere", quantity: 50, weight: 26.46 },
  { symbol: "crepe", quantity: 5, weight: 2.65 },
  { symbol: "cafe", quantity: 25, weight: 13.47 },
  { symbol: "volant", quantity: 3, weight: 1.59 },
  { symbol: "figurine", quantity: 5, weight: 2.65 },
  { symbol: "banane", quantity: 6, weight: 3.18 },
  { symbol: "perdu", quantity: 1000, weight: 50 },
];

// Dimanche
/*
const REWARDS_DATA = [
  { symbol: "biere", quantity: 49, weight: 26.63 },
  { symbol: "crepe", quantity: 5, weight: 2.72 },
  { symbol: "cafe", quantity: 23, weight: 13.03 },
  { symbol: "volant", quantity: 3, weight: 1.63 },
  { symbol: "figurine", quantity: 5, weight: 2.72 },
  { symbol: "banane", quantity: 6, weight: 3.27 },
  { symbol: "perdu", quantity: 1000, weight: 50 },
];
*/

async function resetDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✓ Connected to MongoDB Atlas");

    await RewardRepository.deleteAll();
    console.log("✓ Deleted all existing rewards");

    for (const rewardData of REWARDS_DATA) {
      await RewardRepository.create(rewardData);
    }
    console.log(`✓ Created ${REWARDS_DATA.length} rewards`);

    console.log("\n✓ Database reset successfully!");
  } catch (err) {
    console.error("✗ Database reset error:", err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

resetDatabase();
