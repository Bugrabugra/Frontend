import React, { Suspense } from "react";
import TicketList from "@/app/(dashboard)/tickets/TicketList";
import Loading from "@/app/(dashboard)/loading";

const Tickets = () => {
  return (
    <main>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p><small>Currently open tickets.</small></p>
        </div>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
};

export default Tickets;
