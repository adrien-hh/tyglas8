// index.js - Point d'entrée de l'application frontend
import { AnimationManager } from "./AnimationManager.js";
import { APIManager } from "./APIManager.js";
import { GameManager } from "./GameManager.js";

// Initialisation
const gameManager = new GameManager();
const spinButton = document.getElementById("play-button");
const slotContainer = document.querySelector(".slots-container");
const shadow = document.getElementById("shadow");
const resultImages = Array.from(document.querySelectorAll(".result"));

let animationManager;
let spinningIntervals = [];

// Fonction utilitaire
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Initialisation de l'application
async function init() {
  try {
    await gameManager.initialize();
    animationManager = new AnimationManager(gameManager);
    console.log("🎮 Jeu initialisé avec succès");
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
  }
}

// Gestionnaire de clic sur la box
function handlePlayClick() {
  if (gameManager.isGameSpinning()) return;

  gameManager.setSpinning(true);
  animationManager.hideResults(resultImages, shadow);
  animationManager.animateBoxBurst(spinButton);
  animationManager.showSlots(slotContainer);

  delay(400).then(() => spin());
}

// Logique principale du spin
async function spin() {
  try {
    spinButton.classList.add("spinning");
    spinningIntervals = [];

    // Démarrer la rotation
    const slot = document.getElementById("slot1");
    const interval = animationManager.startSlotSpin(slot);
    spinningIntervals.push(interval);

    // Attendre la durée déterminée par le backend
    const backendResult = await APIManager.spin();
    const spinDuration = backendResult.spinDuration || 3000;

    await delay(spinDuration);

    // Arrêter sur le résultat
    const resultCombination = backendResult.combination;
    animationManager.stopSlotSpin(slot, resultCombination[0], interval);

    await delay(1200);
    animationManager.showResult(backendResult.prize, shadow, resultImages);

    // Gestion du reset
    document.addEventListener("click", resetGame, { once: true });
  } catch (error) {
    console.error("❌ Erreur lors du spin:", error);
    resetGame();
  }
}

// Reset du jeu
function resetGame() {
  animationManager.hideResults(resultImages, shadow);
  animationManager.hideSlots(slotContainer);
  animationManager.resetBox(spinButton);
  spinButton.classList.remove("spinning");
  gameManager.setSpinning(false);
}

// Événements
spinButton.addEventListener("click", handlePlayClick);

// Démarrage
init();
