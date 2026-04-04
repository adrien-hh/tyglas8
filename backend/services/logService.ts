import * as fs from 'node:fs';
import { IReward } from '../types';

export class LogService {
    private logPath: string;

    constructor(logPath: string) {
        this.logPath = logPath;
    }

    logResult(reward: IReward | null): void {
        if (!reward) return;

        const now = new Date();
        const time = now.toLocaleString("fr-FR");
        const content = `${time} ; récompense : ${reward.reward}\n`;
        fs.appendFile(this.logPath, content, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}