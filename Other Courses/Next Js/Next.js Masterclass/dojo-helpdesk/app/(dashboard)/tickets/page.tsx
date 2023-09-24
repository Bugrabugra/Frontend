import React, { Suspense } from "react";
import TicketList from "@/app/(dashboard)/tickets/TicketList";
import Loading from "@/app/(dashboard)/loading";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dojo Helpdesk | Tickets"
};

const Tickets = () => {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p><small>Currently open tickets.</small></p>
        </div>
        <Link href="/tickets/create" className="ml-auto">
          <button className="btn-primary">New Ticket</button>
        </Link>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
};

export default Tickets;
