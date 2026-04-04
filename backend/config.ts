import path from "path";
import { SymbolType } from "./types";

export const CONFIG = {
  // Logging
  LOG_PATH: path.join(__dirname, "public", "logs", "tirages.txt"),

  // Symbols
  SYMBOLS: ["biere", "cafe", "volant", "crepe", "buvette"] as SymbolType[],

  // Game settings
  MIN_SPIN_DURATION: 2000,
  MAX_SPIN_DURATION: 4000,
};
