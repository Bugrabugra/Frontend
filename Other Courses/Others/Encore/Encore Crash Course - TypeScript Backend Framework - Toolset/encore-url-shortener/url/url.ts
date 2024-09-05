import { api } from "encore.dev/api";
import { randomBytes } from "node:crypto";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("encore-url-shortener");

interface UrlResponse {
  id: string;
  url: string;
}

interface UrlParams {
  url: string;
}

export const shorten = api(
  {
    method: "POST",
    path: "/url",
    expose: true
  },
  async ({ url }: UrlParams): Promise<UrlResponse> => {
    const id = randomBytes(6).toString("base64url");
    await db.exec`INSERT INTO url (id, original_url)
                  VALUES (${id}, ${url})`;

    return { id, url };
  }
);
