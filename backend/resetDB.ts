import "dotenv/config";
import fs from "fs/promises";
import mongoose from "mongoose";
import { CONFIG } from "./config";
import { RewardRepository } from "./repositories/RewardRepository";

const REWARDS_DATA = [
  { combination: "biere", reward: "Des sous-bocks", quantity: 40, weight: 16 },
  { combination: "cafe", reward: "Un café/un thé", quantity: 500, weight: 24 },
  {
    combination: "volant",
    reward: "Deux volants pour ton match !",
    quantity: 6,
    weight: 2.5,
  },
  { combination: "crepe", reward: "Une crêpe", quantity: 500, weight: 24 },
  {
    combination: "buvette",
    reward: "Une carte buvette de 10€",
    quantity: 1,
    weight: 0.5,
  },
  { combination: "perdu", reward: "Perdu", quantity: 10000, weight: 33 },
];

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

    await fs.writeFile(CONFIG.LOG_PATH, "");
    console.log("✓ Log file reset");

    console.log("\n✓ Database reset successfully!");
  } catch (err) {
    console.error("✗ Database reset error:", err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

resetDatabase();
