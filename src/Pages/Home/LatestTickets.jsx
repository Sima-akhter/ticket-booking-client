import React, { useEffect, useState } from "react";
import TicketCard from "../Advertisement/TicketCard";


const LatestTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tickets/letast")
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-6">
         Advertisement Tickets
      </h2>

      {tickets.length === 0 && (
        <p className="text-center">No advertised tickets found</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;
