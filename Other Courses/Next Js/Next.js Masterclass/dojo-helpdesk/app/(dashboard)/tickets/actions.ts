"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTicket(formData: FormData) {
  const ticket = Object.fromEntries(formData);

  const supabase = createServerActionClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // insert data
  const { error } = await supabase.from("tickets")
    .insert({
      ...ticket,
      user_email: session?.user.email
    });

  if (error) {
    throw new Error("Could not add the new ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id: string | undefined) {
  const supabase = createServerActionClient({ cookies });

  // delete data
  const { error } = await supabase.from("tickets")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Could not delete the new ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
