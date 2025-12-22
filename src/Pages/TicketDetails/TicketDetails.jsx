import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTicketAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  
  useEffect(() => {
    fetch(`http://localhost:5000/tickets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);
console.log(ticket)
  
  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <FaBus className="text-6xl text-white" />;
      case "train":
        return <FaTrain className="text-6xl text-white" />;
      case "plane":
        return <FaPlane className="text-6xl text-white" />;
      case "launch":
        return <FaShip className="text-6xl text-white" />;
      default:
        return <FaBus className="text-6xl text-white" />;
    }
  };

  
  const getCountdown = () => {
    if (!ticket?.departureDateTime
) return "N/A";

    // const departure = new Date(
    //   `${ticket.departureDate}T${ticket.departureTime}:00`
    // );
    const now = new Date();
    const diff =new Date(ticket.departureDateTime) -now;

    if (diff <= 0)
      return <span className="text-red-600 font-bold">Departed</span>;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return (
      <span className="text-green-600 font-bold">
        {days}d {hours}h {minutes}m left
      </span>
    );
  };

 console.log(getCountdown())
  const handleBooking = async () => {
    if (quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
console.log(quantity, ticket)
    if (quantity > ticket.ticketQuantity) {
      alert("Not enough seats available");
      return;
    }

    const bookingInfo = {
      ticketId: ticket._id,
      ticketTitle: ticket.ticketTitle,
      from: ticket.from,
      to: ticket.to,
      unitPrice: ticket.price,
      bookingQuantity: Number(quantity),
      totalPrice: ticket.price * quantity,
      vendorEmail:ticket.vendorEmail,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingInfo);

      if (res.data?.insertedId) {
        document.getElementById("book_modal").close();
        alert("Booking request sent successfully!");
        navigate("/dashboard/myBookedTickets");
      }
    } catch (error) {
      console.error(error);
      alert("Unauthorized! Please login again.");
    }
  };

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  
  if (!ticket) {
    return (
      <p className="text-center text-3xl text-red-600 mt-20">
        Ticket not found!
      </p>
    );
  }

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
         
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={ticket.imageUrl}
              alt={ticket.ticketTitle}
              className="w-full h-full min-h-96 object-cover"
            />

            <div className="absolute top-6 left-6 bg-white/20 p-6 rounded-full backdrop-blur">
              {getTransportIcon(ticket.transportType)}
            </div>

            <div className="absolute bottom-6 left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl text-4xl font-bold">
              TK{ticket.price}
              <span className="block text-lg font-normal">per ticket</span>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl font-extrabold">{ticket.ticketTitle}</h1>

            <p className="text-2xl flex items-center gap-3">
              <FaMapMarkerAlt className="text-purple-600" />
              {ticket.from} → {ticket.to}
            </p>

            <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow">
              <div>
                <p className="text-gray-500">Available Seats</p>
                <p className="text-2xl font-bold">
                  {ticket.ticketQuantity}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Departure</p>
                <p className="font-bold">
                  {ticket.departureDate} | {ticket.departureTime}
                </p>
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <FaClock className="text-purple-600" />
                {getCountdown()}
              </div>
            </div>

            <button
              onClick={() =>
                document.getElementById("book_modal").showModal()
              }
              className="w-full btn bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl py-4 rounded-2xl"
            >
              Book Now
            </button>
          </motion.div>
        </div>
      </section>

     
      <dialog id="book_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-2xl font-bold mb-4">Confirm Booking</h3>

          <p>
            <strong>Route:</strong> {ticket.from} → {ticket.to}
          </p>

          <p className="mb-4">
            <strong>Price:</strong> TK{ticket.price} per seat
          </p>

          <input
            type="number"
            min="1"
            max={ticket.ticketQuantity}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered w-full mb-4"
          />

          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() =>
                document.getElementById("book_modal").close()
              }
            >
              Cancel
            </button>

            <button
              onClick={handleBooking}
              className="btn bg-purple-600 text-white"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default TicketDetails;
