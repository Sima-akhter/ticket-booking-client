import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/tickets?vendorEmail=${user.email}`)
      .then(res => res.json())
      .then(data => setTickets(data))
      .catch(err => console.error("Fetch error:", err));
  }, [user]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {tickets.map(ticket => (
        <div key={ticket._id} className="card p-4 shadow">
          <h2>{ticket.ticketTitle}</h2>
          <p>Status: {ticket.status}</p>

          <button
            disabled={ticket.status !== "pending"}
            className="btn btn-sm"
          >
            Update
          </button>

          <button
            disabled={ticket.status !== "pending"}
            className="btn btn-sm btn-error"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyAddedTickets;
