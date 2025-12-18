// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tickets") 
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // Only admin-approved tickets
        // const approvedTickets = data.filter(ticket => ticket.adminApproved === true);
        // setTickets(approvedTickets);
        setTickets(data)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">All Tickets</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {tickets.map(ticket => (
          <div key={ticket._id} className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            
            {/* Image */}
            <img
              src={ticket.imageUrl}
              alt={ticket.ticketTitle}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col justify-between h-full">
              {/* Ticket Info */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
                <p className="text-gray-600 mb-1">
                  {ticket.from} → {ticket.to}
                </p>
                <p className="text-gray-600 mb-1">Transport: {ticket.transportType}</p>
                <p className="text-gray-600 mb-1">Price: ${ticket.price}</p>
                <p className="text-gray-600 mb-1">Quantity: {ticket.ticketQuantity}</p>
                <p className="text-gray-600 mb-1">Perks: {ticket.perks}</p>
                <p className="text-gray-600">Departure: {ticket.departureDate} | {ticket.departureTime}</p>
              </div>

              {/* Details Button */}
              <Link
                to={`/ticket/${ticket._id}`}
                className="mt-4 inline-block text-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
