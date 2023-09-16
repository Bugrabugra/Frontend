import React from "react";
import CreateForm from "@/app/(dashboard)/tickets/create/CreateForm";

const CreateTickets = () => {
  return (
    <main>
      <h2 className="text-primary text-center">Add a New Ticket</h2>
      <CreateForm />
    </main>
  );
};

export default CreateTickets;
