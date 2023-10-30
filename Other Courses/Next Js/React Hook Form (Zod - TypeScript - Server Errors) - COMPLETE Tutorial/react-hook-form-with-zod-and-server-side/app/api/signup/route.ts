import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/types";

export async function POST(request: Request) {
  const body: unknown = await request.json();

  const result = signupSchema.safeParse(body);

  let zodErrors = {};

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    })
  }

  return NextResponse.json(Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true })
}
