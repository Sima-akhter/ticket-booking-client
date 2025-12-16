import React, { useEffect, useState } from "react";
import { useParams } from "react-router";


const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/tickets/${id}`) // ✅ correct endpoint
      .then((res) => res.json())
      .then((data) => {
        console.log("Ticket details:", data); // 🔥 debug
        setTicket(data);
      });
  }, [id]);

  if (!ticket) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 card bg-base-100 shadow-xl p-6">
      <img
        src={ticket.imageUrl}
        alt={ticket.ticketTitle}
        className="rounded-lg mb-4"
      />

      <h2 className="text-3xl font-bold mb-2">
        {ticket.ticketTitle}
      </h2>

      <p>💰 Price: {ticket.price} ৳</p>
      <p>🎫 Quantity: {ticket.ticketQuantity}</p>
      <p>🚍 Transport: {ticket.transportType}</p>

      <h4 className="font-semibold mt-4">Perks:</h4>
      <ul className="list-disc ml-6">
        {ticket.perks?.map((perk, i) => (
          <li key={i}>{perk}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDetails;
