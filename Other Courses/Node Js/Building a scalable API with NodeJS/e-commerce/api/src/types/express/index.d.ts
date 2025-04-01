export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: Number;
      role: "user" | "seller";
      cleanBody?: any;
    }
  }
}
