import { JwtPayload } from ".";

export type JwtPayloadWithRefreshTokenType = JwtPayload & {
  refreshToken: string;
};
