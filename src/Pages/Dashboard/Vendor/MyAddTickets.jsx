import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch tickets by vendor email
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    fetch(`http://localhost:5000/ticketsAdd?vendorEmail=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [user?.email]);

 
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/tickets/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          
          const remaining = tickets.filter(ticket => ticket._id !== id);
          setTickets(remaining);
        }
      })
      .catch(err => console.error("Delete error:", err));
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {tickets.length === 0 && (
        <p className="text-center col-span-3">No tickets found</p>
      )}

      {tickets.map(ticket => (
        <div key={ticket._id} className="card p-4 shadow space-y-2">
          <h2 className="font-semibold text-lg">{ticket.ticketTitle}</h2>
          <p>
            Status:{" "}
            <span className="font-medium">{ticket.status}</span>
          </p>

          <div className="flex gap-2">
            <button
              disabled={ticket.status !== "Pending"}
              className="btn btn-sm"
            >
              Update
            </button>

            <button
              onClick={() => handleDelete(ticket._id)}
              disabled={ticket.status !== "Pending"}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddedTickets;
