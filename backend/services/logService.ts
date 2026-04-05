import * as fs from "node:fs";

export class LogService {
  private logPath: string;

  constructor(logPath: string) {
    this.logPath = logPath;
  }

  logResult(symbol: string): void {
    const now = new Date();
    const time = now.toLocaleString("fr-FR");
    const content = `${time} ; récompense : ${symbol}\n`;
    fs.appendFile(this.logPath, content, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
