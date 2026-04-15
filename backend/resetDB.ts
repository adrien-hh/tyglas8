import "dotenv/config";
import fs from "fs/promises";
import mongoose from "mongoose";
import path from "path";
import { CONFIG } from "./config";
import { RewardRepository } from "./repositories/RewardRepository";

const REWARDS_DATA = [
  { symbol: "biere", quantity: 40, weight: 16 },
  { symbol: "cafe", quantity: 500, weight: 24 },
  {
    symbol: "volant",
    quantity: 6,
    weight: 2.5,
  },
  { symbol: "crepe", quantity: 500, weight: 24 },
  {
    symbol: "buvette",
    quantity: 1,
    weight: 0.5,
  },
  { symbol: "perdu", quantity: 10000, weight: 33 },
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

    await fs.mkdir(path.dirname(CONFIG.LOG_PATH), { recursive: true });
    await fs.writeFile(CONFIG.LOG_PATH, "Date;Résultat\n", {
      encoding: "utf8",
    });
    console.log("✓ Log file created/reset at", CONFIG.LOG_PATH);

    console.log("\n✓ Database reset successfully!");
  } catch (err) {
    console.error("✗ Database reset error:", err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

resetDatabase();
