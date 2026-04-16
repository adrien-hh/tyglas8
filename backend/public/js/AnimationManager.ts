// AnimationManager.ts - Gestion des animations
export function updateSizes(): number {
  const width = window.innerWidth;
  let containerSize: number;

  if (width < 768) {
    // Mobile
    containerSize = 50;
    document.documentElement.style.setProperty("--slot-container-size", "50vw");
    document.documentElement.style.setProperty("--symbol-height", "30vw");
  } else if (width < 1200) {
    // Tablet/Desktop moyen
    containerSize = 40;
    document.documentElement.style.setProperty("--slot-container-size", "40vw");
    document.documentElement.style.setProperty("--symbol-height", "24vw");
  } else {
    // Grand écran
    containerSize = 25;
    document.documentElement.style.setProperty("--slot-container-size", "25vw");
    document.documentElement.style.setProperty("--symbol-height", "15vw");
  }

  return containerSize;
}

// Initialiser les tailles au chargement
updateSizes();

// Mettre à jour au redimensionnement
window.addEventListener("resize", updateSizes);

export class AnimationManager {
  private gameManager: any;

  constructor(gameManager: any) {
    this.gameManager = gameManager;
  }

  animateBoxBurst(button: HTMLElement) {
    button.classList.add("burst");
    (button as HTMLButtonElement).disabled = true;
    setTimeout(() => {
      button.classList.add("hidden");
    }, 350);
  }

  showSlots(container: HTMLElement) {
    container.classList.remove("hidden");
  }

  hideSlots(container: HTMLElement) {
    container.classList.add("hidden");
  }

  hideResults(images: HTMLElement[], shadow: HTMLElement) {
    images.forEach((image) => image.classList.add("hidden"));
    shadow.classList.add("hidden");
  }

  showResult(prize: string, shadow: HTMLElement) {
    shadow.classList.remove("hidden");
    const prizeElement = document.getElementById(prize);
    if (prizeElement) {
      prizeElement.classList.remove("hidden");
    }
  }

  resetBox(button: HTMLElement) {
    button.classList.remove("hidden", "burst");
    (button as HTMLButtonElement).disabled = false;
  }

  startSlotSpin(slot: HTMLElement): number {
    const strip = slot.querySelector(".slot-images") as HTMLElement;
    let index = 0;
    const symbols = this.gameManager.getConfig().symbols;

    console.log(`Symbols : ${symbols}`);

    const interval = setInterval(() => {
      const containerSize = updateSizes();
      strip.style.transform = `translateX(-50%) translateY(-${index * containerSize}vw)`;
      strip.style.transition = "transform 0.1s linear";
      index = (index + 1) % symbols.length;
    }, 100);

    return interval;
  }

  stopSlotSpin(slot: HTMLElement, targetSymbol: string, intervalId: number) {
    clearInterval(intervalId);

    const strip = slot.querySelector(".slot-images") as HTMLElement;
    const offset = this.gameManager.calculateSymbolOffset(targetSymbol);

    strip.style.transition = "transform 0.3s ease-out";
    strip.style.transform = `translateX(-50%) translateY(-${offset}vw)`;
  }

  resetSlot(slot: HTMLElement) {
    const strip = slot.querySelector(".slot-images") as HTMLElement;
    strip.style.transition = "none";
    strip.style.transform = "translateX(-50%) translateY(0)";
  }
}
