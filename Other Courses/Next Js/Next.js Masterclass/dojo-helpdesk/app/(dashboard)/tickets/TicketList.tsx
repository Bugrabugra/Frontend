import React from "react";
import { Ticket } from "@/app/(dashboard)/tickets/types";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getTickets(): Promise<Ticket[] | null> {
  // imitate delay
  // await new Promise(resolve => setTimeout(resolve, 3000));

  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("tickets")
    .select();

  if (error) {
    console.log(error.message);
  }

  return data;
}

const TicketList = async () => {
  const tickets = await getTickets();

  return (
    <>
      {tickets?.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets?.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
};

export default TicketList;
