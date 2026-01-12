import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";
import { getRemainingTime } from "../../../utils/time";
import { motion } from "framer-motion";
import { CreditCard, MapPin, Calendar, Clock, Ticket, CheckCircle2, AlertCircle } from "lucide-react";

const MyBookedTickets = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const token = await currentUser.getIdToken();

      const res = await fetch(`https://server-kappa-lemon.vercel.app/bookings/user/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user]);

  const handlePay = async (bookingId) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) return alert("User not logged in");

      const token = await currentUser.getIdToken();
      const res = await fetch("https://server-kappa-lemon.vercel.app/payment-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId }),
      });

      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert(data.message || "Unable to start payment");
    } catch (error) {
      alert("Payment failed");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Loading Journeys...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-base-200/30">
      {/* Header Section */}
      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-base-content flex items-center justify-center md:justify-start gap-3">
            <Ticket className="text-primary w-8 h-8" />
            My <span className="text-primary">Booked</span> Tickets
          </h2>
          <p className="text-sm font-bold opacity-50 mt-2 uppercase tracking-tighter">Manage your upcoming travels and payments</p>
        </div>
        <div className="badge badge-primary badge-outline font-black px-4 py-3">Total: {bookings.length}</div>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[2.5rem] border border-dashed border-base-300">
          <Ticket size={60} className="opacity-10 mb-4" />
          <p className="text-xl font-bold opacity-40 italic">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bookings.map((b, index) => {
            const remaining = getRemainingTime(b.departureDateTime);
            const isExpired = remaining === "Expired";

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={b._id}
                className="group bg-base-100 rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-base-300 hover:border-primary/40 relative"
              >
                {/* Status Badge Over Image */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md 
                    ${b.status === "paid" ? "bg-success text-white" : 
                      b.status === "accepted" ? "bg-primary text-white" : 
                      b.status === "rejected" ? "bg-error text-white" : "bg-warning text-black"}`}>
                    {b.status}
                  </span>
                </div>

                <figure className="h-44 overflow-hidden relative">
                  <img src={b.imageUrl} alt={b.ticketTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-6">
                     <p className="text-white font-black text-lg flex items-center gap-2">
                       <MapPin size={16} className="text-primary" /> {b.from} → {b.to}
                     </p>
                  </div>
                </figure>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-black text-base-content line-clamp-1 group-hover:text-primary transition-colors italic uppercase tracking-tighter">
                    {b.ticketTitle}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                      <Calendar size={14} className="text-primary" />
                      {new Date(b.departureDateTime).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                      <Clock size={14} className="text-primary" />
                      {new Date(b.departureDateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-base-200/50 p-4 rounded-2xl border border-base-300">
                    <div>
                      <p className="text-[10px] font-black opacity-40 uppercase">Amount</p>
                      <p className="text-2xl font-black text-primary">৳{b.totalPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black opacity-40 uppercase">Quantity</p>
                      <p className="font-bold text-lg">{b.bookingQuantity}</p>
                    </div>
                  </div>

                  {/* Dynamic Status UI */}
                  <div className="pt-2">
                    {b.status === "paid" ? (
                      <div className="flex items-center justify-center gap-2 py-3 bg-success/10 text-success rounded-xl font-black text-sm border border-success/20">
                        <CheckCircle2 size={18} /> Payment Completed
                      </div>
                    ) : isExpired ? (
                      <div className="flex items-center justify-center gap-2 py-3 bg-error/10 text-error rounded-xl font-black text-sm border border-error/20">
                        <AlertCircle size={18} /> Schedule Passed
                      </div>
                    ) : b.status === "accepted" ? (
                      <div className="space-y-3">
                         <p className="text-center text-[11px] font-black text-primary animate-pulse uppercase tracking-widest italic">
                           ⏳ Action Required: {remaining}
                         </p>
                         <button onClick={() => handlePay(b._id)} className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-focus transition-all flex items-center justify-center gap-2 group/btn">
                           <CreditCard size={18} className="group-hover/btn:rotate-12 transition-transform" /> 
                           Pay Now →
                         </button>
                      </div>
                    ) : (
                      <p className="text-center text-xs font-bold opacity-50 italic">Waiting for vendor confirmation...</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;