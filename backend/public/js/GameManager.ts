// GameManager.ts - Gestion de l'état du jeu
export class GameManager {
  private isSpinning = false;
  private config: any = null;

  async initialize() {
    // Charger la config depuis le backend
    const response = await fetch("/config");
    this.config = await response.json();
  }

  getConfig() {
    return this.config;
  }

  setSpinning(spinning: boolean) {
    this.isSpinning = spinning;
  }

  isGameSpinning() {
    return this.isSpinning;
  }

  calculateSymbolOffset(symbolName: string): number {
    const symbolIndex = this.config.symbols.indexOf(symbolName);
    return symbolIndex * 20; // 20vh par symbole
  }
}
