import React from "react";
import { Ticket } from "@/app/(dashboard)/tickets/types";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;

  const res = await fetch(`http://localhost:4000/tickets/${id}`);
  const ticket = await res.json();

  return {
    title: `Dojo Helpdesk | ${ticket.title}`
  };
}

export async function generateStaticParams(): Promise<{ id: Ticket["id"] }[]> {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();

  return tickets.map((ticket: Ticket) => {
    return { id: ticket.id };
  });
}

async function getTicket(id: string): Promise<Ticket> {
  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 60 // use 0 to opt out of using cache
    }
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

const TicketDetails = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const ticket = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
