// Classes
export class Invoice {
    // readonly client: string; // Access var ama change yok
    // private details: string; // Access yok, log bile olmuyor class dışından
    // public amount: number; // Default public
    constructor(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.client} owes £${this.amount} for ${this.details}`;
    }
}
