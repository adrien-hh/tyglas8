export interface IReward {
    _id?: string;
    combination: string;
    reward: string;
    quantity: number;
    weight: number;
}

export interface ISpinResult {
    combination: string[];
    prize: string;
    spinDuration?: number;
}

export interface ISpinRequest {
    // Vide pour l'instant, mais peut être étendu
}

export type SymbolType = 'biere' | 'cafe' | 'volant' | 'crepe' | 'buvette';

export interface IGameConfig {
    symbols: SymbolType[];
    minSpinDuration: number;
    maxSpinDuration: number;
}