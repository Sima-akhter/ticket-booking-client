import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { FaBus, FaTrain, FaPlane, FaShip, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaCheckCircle } from "react-icons/fa";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus": return <FaBus className="text-6xl text-white" />;
      case "train": return <FaTrain className="text-6xl text-white" />;
      case "plane": return <FaPlane className="text-6xl text-white" />;
      case "launch": return <FaShip className="text-6xl text-white" />;
      default: return <FaBus className="text-6xl text-white" />;
    }
  };

  const getCountdown = () => {
    if (!ticket?.departureDate || !ticket?.departureTime) return "N/A";
    const departure = new Date(`${ticket.departureDate}T${ticket.departureTime}:00`);
    const now = new Date();
    const diff = departure - now;

    if (diff <= 0) return <span className="text-red-600 font-bold">Departed</span>;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return <span className="text-green-600 font-bold">{days}d {hours}h {minutes}m left</span>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  if (!ticket) return <p className="text-center text-3xl text-red-600 mt-20">Ticket not found!</p>;

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Image with Overlay */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={ticket.imageUrl}
              alt={ticket.ticketTitle}
              className="w-full h-full min-h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

            {/* Transport Icon */}
            <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-md rounded-full p-6 shadow-xl">
              {getTransportIcon(ticket.transportType)}
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-8 left-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-4xl px-8 py-5 rounded-2xl shadow-2xl">
              ৳{ticket.price}
              <span className="block text-xl font-normal">per ticket</span>
            </div>
          </motion.div>

          {/* Right Side: Details */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                {ticket.ticketTitle}
              </h1>
              <p className="text-2xl text-gray-700 flex items-center gap-3">
                <FaMapMarkerAlt className="text-purple-600" />
                {ticket.from} → {ticket.to}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <FaTicketAlt className="text-3xl text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Available Seats</p>
                  <p className="text-2xl font-bold">{ticket.ticketQuantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaCalendarAlt className="text-3xl text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Departure</p>
                  <p className="text-lg font-bold">
                    {new Date(ticket.departureDate).toLocaleDateString()} | {ticket.departureTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:col-span-2">
                <FaClock className="text-3xl text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Time Left</p>
                  <p className="text-2xl font-bold">{getCountdown()}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <FaCheckCircle className="text-green-600" /> Included Perks
              </h3>
              <ul className="space-y-3">
                {ticket.perks?.map((perk, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-700">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                    <span>{perk}</span>
                  </li>
                ))}
                {(!ticket.perks || ticket.perks.length === 0) && (
                  <li className="text-gray-500">No additional perks listed</li>
                )}
              </ul>
            </div>

            <div className="pt-6">
              <button
                className="w-full btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl py-5 rounded-2xl shadow-2xl hover:shadow-purple-600 transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById("book_modal").showModal()}
              >
                Book Now – Secure Your Seat!
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TicketDetails;