export interface IReward {
  _id?: string;
  symbol: string;
  quantity: number;
  weight: number;
}

export interface ISpinResult {
  symbol: string;
  spinDuration?: number;
}

export interface ISpinRequest {
  // Vide pour l'instant, mais peut être étendu
}

export interface IGameConfig {
  symbols: string[];
  minSpinDuration: number;
  maxSpinDuration: number;
}
