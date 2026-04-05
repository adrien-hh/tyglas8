// AnimationManager.ts - Gestion des animations
export const CONTAINER_SIZE = 50; // 50vw par symbole
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
    showResult(prize, shadow, images) {
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
        const interval = setInterval(() => {
            strip.style.transform = `translate(-50%, calc(-50% - ${index * CONTAINER_SIZE}vw))`;
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
