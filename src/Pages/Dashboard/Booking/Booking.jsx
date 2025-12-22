import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";

const Booking = () => {
  const { id } = useParams(); // ticket id (IMPORTANT)
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [bookingQuantity, setBookingQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch single ticket
  useEffect(() => {
    if (!id) return;

    fetch(`server-kappa-lemon.vercel.app
/tickets/${id}`)
      .then(res => res.json())
      .then(data => {
        setTicket(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 🔹 Handle booking
  const handleBooking = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return alert("Please login first");
      }

      const token = await currentUser.getIdToken();

      const bookingInfo = {
        ticketId: ticket._id,
        ticketTitle: ticket.title,
        imageUrl: ticket.image,
        from: ticket.from,
        to: ticket.to,
        departureDateTime: ticket.departureDateTime,
        vendorEmail: ticket.vendorEmail,

        bookingQuantity,               
        unitPrice: ticket.price,      
        totalPrice: bookingQuantity * ticket.price,
      };

      const res = await fetch("server-kappa-lemon.vercel.app/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingInfo),
      });

      const data = await res.json();

      if (data.insertedId) {
        alert("Ticket booked successfully!");
        navigate("/dashboard/myBookedTickets");
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed!");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading ticket...</p>;
  }

  if (!ticket) {
    return <p className="text-center mt-10 text-red-500">Ticket not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={ticket.image}
            alt={ticket.title}
            className="h-64 w-full object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-2xl">{ticket.title}</h2>

          <p className="text-gray-600">
            {ticket.from} → {ticket.to}
          </p>

          <p>
            Departure:{" "}
            {new Date(ticket.departureDateTime).toLocaleString()}
          </p>

          <p className="font-semibold">Price: {ticket.price} TK</p>

          {/* Quantity */}
          <div className="mt-4">
            <label className="font-medium">Quantity</label>
            <input
              type="number"
              min="1"
              max={ticket.ticketQuantity}
              value={bookingQuantity}
              onChange={(e) => setBookingQuantity(Number(e.target.value))}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <p className="mt-2 font-bold">
            Total: {bookingQuantity * ticket.price} TK
          </p>

          <button
            onClick={handleBooking}
            className="btn btn-primary mt-4"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
