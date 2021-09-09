import {HasFormatter} from "../interfaces/HasFormatter.js";

// Classes
export class Payments implements HasFormatter {
  // readonly client: string; // Access var ama change yok
  // private details: string; // Access yok, log bile olmuyor class dışından
  // public amount: number; // Default public

  constructor(
    readonly recipient: string,
    private details: string,
    public amount: number
  ) {}

  format() {
    return `${this.recipient} is owed £${this.amount} for ${this.details}`;
  }
}