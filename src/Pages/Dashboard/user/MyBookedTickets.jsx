

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { getRemainingTime } from "../../../utils/time";

const MyBookedTickets = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    fetch(`http://localhost:5000/bookings/user/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user]);

  const handlePay = (bookingId) => {
    fetch(`http://localhost:3000/pay/${bookingId}`, {
      method: "POST",
    })
      .then(res => res.json())
      .then(() => {
        alert("Payment Successful 🎉");
        fetchBookings();
      });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading bookings...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        🎟️ My Booked Tickets
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not booked any tickets yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {bookings.map((b) => {
            const remaining = getRemainingTime(b.departureDateTime);

            return (
              <div
                key={b._id}
                className="card bg-base-100 shadow-xl border"
              >
                <figure>
                  <img
                    src={b.imageUrl}
                    alt={b.ticketTitle}
                    className="h-40 w-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{b.ticketTitle}</h2>

                  <p>
                    📍 {b.from} → {b.to}
                  </p>

                  <p>🕒 {new Date(b.departureDateTime).toLocaleString()}</p>

                  <p>🎫 Quantity: {b.quantity}</p>

                  <p className="font-semibold">
                    💰 Total: {b.totalPrice} ৳
                  </p>

                  {/* STATUS */}
                  <div className="mt-2">
                    <span
                      className={`badge ${
                        b.status === "pending"
                          ? "badge-warning"
                          : b.status === "accepted"
                          ? "badge-info"
                          : b.status === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* COUNTDOWN */}
                  {b.status !== "rejected" && remaining !== "Expired" && (
                    <p className="text-sm text-gray-600 mt-2">
                      ⏳ {remaining}
                    </p>
                  )}

                  {remaining === "Expired" && (
                    <p className="text-red-500 text-sm mt-2">
                      ❌ Departure time passed
                    </p>
                  )}

                  {/* PAY NOW */}
                  {b.status === "accepted" && remaining !== "Expired" && (
                    <button
                      onClick={() => handlePay(b._id)}
                      className="btn btn-success mt-3"
                    >
                      Pay Now
                    </button>
                  )}

                  {b.status === "paid" && (
                    <p className="text-green-600 font-medium mt-2">
                       Payment Completed
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;
