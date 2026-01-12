import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { Trash2, Edit3, Ticket, AlertCircle } from "lucide-react";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://server-kappa-lemon.vercel.app/ticketsAdd?vendorEmail=${user?.email}`)
      .then(res => res.json()).then(data => { setTickets(data); setLoading(false); });
  }, [user?.email]);

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner text-primary"></span></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-base-content">My <span className="text-primary">Inventory</span></h2>
        <div className="badge badge-primary badge-outline font-bold px-4 py-3">Total: {tickets.length}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <motion.div whileHover={{ y: -5 }} key={ticket._id} className="bg-base-100 rounded-2xl overflow-hidden shadow-md border border-base-300 hover:border-primary/40 transition-all duration-300">
            {/* Status Header matching your card design icons */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                   {ticket.status}
                 </span>
                 <span className="text-[10px] opacity-30 font-bold">ID: {ticket._id?.slice(-5)}</span>
              </div>
              
              <h3 className="text-lg font-bold text-base-content line-clamp-1">{ticket.ticketTitle}</h3>
              
              <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <span>$</span> <span className="text-2xl">{ticket.price}</span>
              </div>

              <div className="pt-4 flex gap-2">
                <button disabled={ticket.status !== "Pending"} className="flex-1 bg-primary text-primary-content py-2 rounded-lg font-bold text-xs disabled:opacity-30">
                  <Edit3 size={14} className="inline mr-1" /> Update
                </button>
                <button className="p-2 bg-error/10 text-error rounded-lg hover:bg-error hover:text-white transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default MyAddedTickets;