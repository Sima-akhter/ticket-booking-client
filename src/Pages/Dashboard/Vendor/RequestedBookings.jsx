import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RequestedBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/vendor/bookings/${user.email}`)
      .then(res => res.json())
      .then(data => setBookings(data));
  }, [user.email]);

  const handleAccept = (id) => {
    fetch(`http://localhost:3000/bookings/accept/${id}`, {
      method: "PATCH",
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire("Accepted!", "Booking approved", "success");
        setBookings(bookings.filter(b => b._id !== id));
      });
  };

  const handleReject = (id) => {
    fetch(`http://localhost:3000/bookings/reject/${id}`, {
      method: "PATCH",
    })
      .then(res => res.json())
      .then(() => {
        Swal.fire("Rejected!", "Booking rejected", "error");
        setBookings(bookings.filter(b => b._id !== id));
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Requested Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>User</th>
              <th>Ticket</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>
                  {booking.userName}
                  <br />
                  <small>{booking.userEmail}</small>
                </td>

                <td>{booking.ticketTitle}</td>

                <td>{booking.bookingQuantity}</td>

                <td>
                  {booking.unitPrice * booking.bookingQuantity} ৳
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleAccept(booking._id)}
                    className="btn btn-success btn-sm"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(booking._id)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No booking requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
