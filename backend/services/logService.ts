import Log from "../models/Log";

export class LogService {
  static async logResult(symbol: string): Promise<void> {
    try {
      const logEntry = new Log({
        date: new Date(),
        result: symbol,
      });
      await logEntry.save();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement du log :", err);
    }
  }
}
