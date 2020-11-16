import {HasFormatter} from "../interfaces/HasFormatter.js";

// Classes
export class Invoice implements HasFormatter {
  // readonly client: string; // Access var ama change yok
  // private details: string; // Access yok, log bile olmuyor class dışından
  // public amount: number; // Default public

  constructor(
    readonly client: string,
    private details: string,
    public amount: number
  ) {}

  format() {
    return `${this.client} owes £${this.amount} for ${this.details}`;
  }
}