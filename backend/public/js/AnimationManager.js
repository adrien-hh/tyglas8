// AnimationManager.ts - Gestion des animations
export function updateSizes() {
    const width = window.innerWidth;
    let containerSize;
    if (width < 768) {
        // Mobile
        containerSize = 50;
        document.documentElement.style.setProperty("--slot-container-size", "50vw");
        document.documentElement.style.setProperty("--symbol-height", "30vw");
    }
    else if (width < 1200) {
        // Tablet/Desktop moyen
        containerSize = 40;
        document.documentElement.style.setProperty("--slot-container-size", "40vw");
        document.documentElement.style.setProperty("--symbol-height", "24vw");
    }
    else {
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
    constructor(gameManager) {
        this.gameManager = gameManager;
    }
    animateBoxBurst(button) {
        button.classList.add("burst");
        button.disabled = true;
        setTimeout(() => {
            button.classList.add("hidden");
        }, 350);
    }
    showSlots(container) {
        container.classList.remove("hidden");
    }
    hideSlots(container) {
        container.classList.add("hidden");
    }
    hideResults(images, shadow) {
        images.forEach((image) => image.classList.add("hidden"));
        shadow.classList.add("hidden");
    }
    showResult(prize, shadow) {
        shadow.classList.remove("hidden");
        const prizeElement = document.getElementById(prize);
        if (prizeElement) {
            prizeElement.classList.remove("hidden");
        }
    }
    resetBox(button) {
        button.classList.remove("hidden", "burst");
        button.disabled = false;
    }
    startSlotSpin(slot) {
        const strip = slot.querySelector(".slot-images");
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
    stopSlotSpin(slot, targetSymbol, intervalId) {
        clearInterval(intervalId);
        const strip = slot.querySelector(".slot-images");
        const offset = this.gameManager.calculateSymbolOffset(targetSymbol);
        strip.style.transition = "transform 0.3s ease-out";
        strip.style.transform = `translateX(-50%) translateY(-${offset}vw)`;
    }
    resetSlot(slot) {
        const strip = slot.querySelector(".slot-images");
        strip.style.transition = "none";
        strip.style.transform = "translateX(-50%) translateY(0)";
    }
}
