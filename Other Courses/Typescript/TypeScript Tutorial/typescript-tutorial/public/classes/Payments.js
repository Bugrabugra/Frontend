// Classes
export class Payments {
    // readonly client: string; // Access var ama change yok
    // private details: string; // Access yok, log bile olmuyor class dışından
    // public amount: number; // Default public
    constructor(recipient, details, amount) {
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
    }
    format() {
        return `${this.recipient} is owed £${this.amount} for ${this.details}`;
    }
}
