import React from "react";
import { Ticket } from "@/app/(dashboard)/tickets/types";
import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import DeleteButton from "@/app/(dashboard)/tickets/[id]/DeleteButton";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: ticket } = await supabase.from("tickets")
    .select()
    .eq("id", params.id)
    .single<Ticket | null>();

  return {
    title: `Dojo Helpdesk | ${ticket?.title || "Ticket not found"}`
  };
}

// export async function generateStaticParams(): Promise<{ id: Ticket["id"] }[]> {
//   const res = await fetch("http://localhost:4000/tickets");
//   const tickets = await res.json();
//
//   return tickets.map((ticket: Ticket) => {
//     return { id: ticket.id };
//   });
// }

async function getTicket(id: string): Promise<Ticket | null> {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from("tickets")
    .select()
    .eq("id", id)
    .single<Ticket | null>();

  if (!data) {
    notFound();
  }

  return data;
}

const TicketDetails = async ({ params }: { params: { id: string } }) => {
  const ticket = await getTicket(params.id);

  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();


  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data.session?.user.email === ticket?.user_email && <DeleteButton id={ticket?.id} />}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket?.title}</h3>
        <small>Created by {ticket?.user_email}</small>
        <p>{ticket?.body}</p>
        <div className={`pill ${ticket?.priority}`}>
          {ticket?.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
