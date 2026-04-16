import { updateSizes } from "./AnimationManager.js";
// GameManager.ts - Gestion de l'état du jeu
export class GameManager {
    constructor() {
        this.isSpinning = false;
        this.config = null;
    }
    async initialize() {
        // Charger la config depuis le backend
        const response = await fetch("/config");
        this.config = await response.json();
    }
    getConfig() {
        return this.config;
    }
    setSpinning(spinning) {
        this.isSpinning = spinning;
    }
    isGameSpinning() {
        return this.isSpinning;
    }
    calculateSymbolOffset(symbolName) {
        const symbolIndex = this.config.symbols.indexOf(symbolName);
        return symbolIndex * updateSizes();
    }
}
