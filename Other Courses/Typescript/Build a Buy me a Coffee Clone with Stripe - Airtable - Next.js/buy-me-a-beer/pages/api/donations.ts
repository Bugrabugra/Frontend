// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import {
  AIRTABLE_API_KEY,
  AIRTABLE_APP_ID,
  STRIPE_API_KEY,
  STRIPE_WEBHOOK_SECRET,
} from "../../config";
import { AirtableRecord } from "../../types";

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/donations?maxRecords=3&view=Grid%20view`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      }
    }
  );

  const data = (await response.json()) as AirtableRecord;

  return res.status(200).json(data.records);
}
