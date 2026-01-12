import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { Hash, CreditCard, Calendar, Ticket, ArrowUpRight, Search } from "lucide-react";

const TransactionHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://server-kappa-lemon.vercel.app/payments/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      });
  }, [user.email]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-xs font-black uppercase tracking-widest opacity-50">Fetching Transactions...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
            <CreditCard className="text-primary w-8 h-8" />
            Transaction <span className="text-primary">History</span>
          </h2>
          <p className="text-sm font-medium opacity-60 mt-1">Review all your successful ticket payments</p>
        </div>
        
        {/* Simple Stats Badge */}
        <div className="bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl flex items-center gap-3">
            <p className="text-[10px] font-black uppercase tracking-wider opacity-60">Total Paid</p>
            <p className="text-xl font-black text-primary">৳{payments.reduce((acc, curr) => acc + curr.amount, 0)}</p>
        </div>
      </div>

      {/* Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 rounded-[2rem] shadow-xl border border-base-300 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-300">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider opacity-60">
                   <div className="flex items-center gap-2"><Hash size={14} /> Transaction ID</div>
                </th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider opacity-60">
                   <div className="flex items-center gap-2"><Ticket size={14} /> Ticket Details</div>
                </th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider opacity-60">
                   <div className="flex items-center gap-2"><Calendar size={14} /> Payment Date</div>
                </th>
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider opacity-60 text-right">
                   <div className="flex items-center justify-end gap-2"><ArrowUpRight size={14} /> Amount</div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-base-200">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-primary/5 transition-colors group">
                  <td className="py-5 px-6">
                    <span className="font-mono text-xs font-bold opacity-70 group-hover:text-primary transition-colors">
                      {p.transactionId}
                    </span>
                  </td>
                  
                  <td className="py-5 px-6 font-bold text-sm text-base-content">
                    {p.ticketTitle}
                  </td>

                  <td className="py-5 px-6">
                    <p className="text-sm font-medium opacity-70">
                      {new Date(p.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </td>

                  <td className="py-5 px-6 text-right">
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-black text-primary">৳{p.amount}</span>
                        <span className="text-[10px] font-black uppercase text-success">Paid Successful</span>
                    </div>
                  </td>
                </tr>
              ))}

              {payments.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                       <Search size={48} className="mb-4" />
                       <p className="text-xl font-black uppercase tracking-widest">No transactions found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionHistory;