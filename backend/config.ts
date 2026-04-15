import path from "path";

export const CONFIG = {
  // Logging
  LOG_PATH: path.join(process.cwd(), "logs", "tirages.txt"),

  // Symbols
  SYMBOLS: ["biere", "cafe", "volant", "crepe", "buvette", "perdu"] as string[],

  // Game settings
  MIN_SPIN_DURATION: 2000,
  MAX_SPIN_DURATION: 4000,
};
