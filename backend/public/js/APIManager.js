// APIManager.ts - Gestion des appels API
export class APIManager {
    static async spin() {
        const response = await fetch("/spin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });
        if (!response.ok) {
            throw new Error("Erreur lors du spin");
        }
        return await response.json();
    }
    static async fakeSpin() {
        const response = await fetch("/fakeSpin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });
        if (!response.ok) {
            throw new Error("Erreur lors du fake spin");
        }
        return await response.json();
    }
    static async getConfig() {
        const response = await fetch("/config");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement de la config");
        }
        return await response.json();
    }
}
