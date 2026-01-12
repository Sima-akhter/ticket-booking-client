import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaBus, FaTrain, FaPlane, FaShip, FaClock,
  FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt,
  FaCheckCircle, FaInfoCircle
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    fetch(`https://server-kappa-lemon.vercel.app/tickets/${id}`)
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

  // রিয়েল-টাইম কাউন্টডাউন আপডেট
  useEffect(() => {
    if (!ticket?.departureDateTime) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = new Date(ticket.departureDateTime) - now;

      if (diff <= 0) {
        setTimeLeft("Departed");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${mins}m ${secs}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [ticket]);

  const getTransportIcon = (type) => {
    const iconClass = "text-5xl text-white";
    switch (type?.toLowerCase()) {
      case "bus": return <FaBus className={iconClass} />;
      case "train": return <FaTrain className={iconClass} />;
      case "plane": return <FaPlane className={iconClass} />;
      case "launch": return <FaShip className={iconClass} />;
      default: return <FaBus className={iconClass} />;
    }
  };

  const handleBooking = async () => {
    if (quantity < 1 || quantity > ticket.ticketQuantity) {
      Swal.fire("Error", "Invalid quantity selected", "error");
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
      vendorEmail: ticket.vendorEmail,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingInfo);
      if (res.data?.insertedId) {
        document.getElementById("book_modal").close();
        Swal.fire("Success", "Booking request sent!", "success");
        navigate("/dashboard/myBookedTickets");
      }
    } catch (error) {
      Swal.fire("Oops!", "Booking failed. Login required.", "error");
    }
  };

  if (loading) return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!ticket) return <div className="text-center py-20 text-error font-bold">Ticket not found!</div>;

  return (
    <section className="min-h-screen py-24 px-4 bg-base-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Side: Image & Price Tag */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={ticket.imageUrl} alt={ticket.ticketTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            <div className="absolute top-6 left-6 bg-primary/80 backdrop-blur-md p-5 rounded-3xl">
              {getTransportIcon(ticket.transportType)}
            </div>

            <div className="absolute -bottom-6 right-6 bg-base-100 p-6 rounded-3xl shadow-xl border border-primary/20">
              <p className="text-sm text-base-content/60 font-medium">Price Starts From</p>
              <h3 className="text-4xl font-black text-primary">TK {ticket.price}</h3>
            </div>
          </motion.div>

          {/* Right Side: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="badge badge-primary badge-outline font-bold uppercase tracking-widest">{ticket.transportType}</div>
            <h1 className="text-4xl md:text-5xl font-black text-base-content">{ticket.ticketTitle}</h1>
            
            <div className="flex items-center gap-4 text-xl font-semibold text-base-content/70">
              <div className="flex items-center gap-2 bg-base-100 px-4 py-2 rounded-xl shadow-sm">
                <FaMapMarkerAlt className="text-primary" /> {ticket.from}
              </div>
              <span className="text-primary">→</span>
              <div className="flex items-center gap-2 bg-base-100 px-4 py-2 rounded-xl shadow-sm">
                <FaMapMarkerAlt className="text-secondary" /> {ticket.to}
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-300">
                <p className="text-xs opacity-50 uppercase font-bold">Seats Left</p>
                <p className="text-xl font-bold">{ticket.ticketQuantity}</p>
              </div>
              <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-300">
                <p className="text-xs opacity-50 uppercase font-bold">Status</p>
                <p className="text-xl font-bold text-green-500">Active</p>
              </div>
              <div className="bg-base-100 p-4 rounded-2xl shadow-sm border border-base-300 col-span-2 sm:col-span-1">
                <p className="text-xs opacity-50 uppercase font-bold">Departure In</p>
                <p className={`text-lg font-bold ${timeLeft === "Departed" ? "text-error" : "text-primary"}`}>
                  <FaClock className="inline mr-1" /> {timeLeft}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-300">
              <h4 className="flex items-center gap-2 text-lg font-bold mb-3">
                <FaInfoCircle className="text-primary" /> Description
              </h4>
              <p className="text-base-content/70 leading-relaxed">
                {ticket.description || "No specific details provided for this journey. Please contact the vendor for more information regarding boarding and luggage."}
              </p>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap gap-2">
              {ticket.perks?.map((perk, idx) => (
                <span key={idx} className="badge badge-ghost p-4 gap-2 border-base-300">
                  <FaCheckCircle className="text-green-500" /> {perk}
                </span>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("book_modal").showModal()}
              className="w-full btn btn-primary btn-lg rounded-2xl font-bold shadow-lg shadow-primary/20"
            >
              Book This Ticket
            </button>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <dialog id="book_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 rounded-3xl">
          <h3 className="text-2xl font-black mb-4">Confirm Your Booking</h3>
          
          <div className="space-y-3 bg-base-200 p-5 rounded-2xl mb-6">
            <p className="flex justify-between"><span>Route:</span> <strong>{ticket.from} - {ticket.to}</strong></p>
            <p className="flex justify-between"><span>Unit Price:</span> <strong>TK {ticket.price}</strong></p>
            <p className="flex justify-between border-t border-base-300 pt-2 text-primary">
              <span>Total Cost:</span> <strong className="text-xl">TK {ticket.price * quantity}</strong>
            </p>
          </div>

          <label className="label text-sm font-bold opacity-70">SELECT SEATS QUANTITY</label>
          <input
            type="number"
            min="1"
            max={ticket.ticketQuantity}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input input-bordered input-primary w-full text-lg font-bold rounded-xl"
          />

          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => document.getElementById("book_modal").close()}>Cancel</button>
            <button onClick={handleBooking} className="btn btn-primary px-8">Confirm Booking</button>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default TicketDetails;