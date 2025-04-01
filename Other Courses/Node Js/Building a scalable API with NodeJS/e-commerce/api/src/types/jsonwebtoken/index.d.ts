import { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface JwtPayloadUserIDRole extends JwtPayload {
    userId: number;
    role: "user" | "seller";
  }
}
