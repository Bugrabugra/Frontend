// export const dynamic = "force-dynamic";
//
// export async function GET(_: NextRequest, { params }: { params: { id: string } }): Promise<Ticket | NextResponse<{ error: string }>> {
//   const id = params.id;
//
//   const res = await fetch("http://localhost:4000/tickets/" + id);
//   const ticket = await res.json();
//
//   if (!res.ok) {
//     return NextResponse.json({ error: "Cannot find the ticket" }, {
//       status: 404
//     });
//   }
//
//   return NextResponse.json(ticket, {
//     status: 200
//   });
// }


import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from("tickets")
    .delete()
    .eq("id", id);

  return NextResponse.json({ error });
}
