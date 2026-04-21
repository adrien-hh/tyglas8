import "dotenv/config";
import mongoose from "mongoose";
import { RewardRepository } from "./repositories/RewardRepository";

// Samedi
const REWARDS_DATA = [
  { symbol: "biere", quantity: 50, weight: 26.5 },
  { symbol: "crepe", quantity: 5, weight: 2.65 },
  { symbol: "cafe", quantity: 15, weight: 8 },
  { symbol: "volant", quantity: 3, weight: 1.6 },
  { symbol: "figurine", quantity: 5, weight: 2.65 },
  { symbol: "banane", quantity: 6, weight: 3.2 },
  { symbol: "perdu", quantity: 1000, weight: 55.4 },
];

// Dimanche
/*
const REWARDS_DATA = [
  { symbol: "biere", quantity: 49, weight: 26.65 },
  { symbol: "crepe", quantity: 5, weight: 2.75 },
  { symbol: "cafe", quantity: 15, weight: 8.2 },
  { symbol: "volant", quantity: 3, weight: 1.65 },
  { symbol: "figurine", quantity: 5, weight: 2.75 },
  { symbol: "banane", quantity: 6, weight: 3.3 },
  { symbol: "perdu", quantity: 1000, weight: 54.7 },
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
