import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CheckCircle, ArrowRight, Home, Ticket, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.transactionId, // assuming trackingId is transactionId based on your code
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-base-100 rounded-[2.5rem] shadow-2xl p-10 text-center border border-base-300"
      >
        {/* Success Animation Icon */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary"
          >
            <CheckCircle size={56} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-base-content mb-3 uppercase tracking-tighter">
          Payment <span className="text-primary">Success!</span>
        </h1>
        <p className="text-sm font-medium opacity-60 mb-8 leading-relaxed">
          Thank you for your purchase. Your ticket booking has been confirmed.
        </p>

        {/* Transaction Info Box */}
        <div className="bg-base-200/50 rounded-[2rem] p-6 text-left border border-base-300 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ClipboardCheck size={80} />
          </div>
          
          <div className="relative z-10">
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Transaction ID</p>
            <p className="font-mono text-sm font-bold text-primary break-all leading-tight">
              {loading ? "Processing..." : paymentInfo.transactionId || "N/A"}
            </p>
          </div>

          <div className="relative z-10 border-t border-base-300 pt-4">
            <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Status</p>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                <p className="font-bold text-sm text-base-content uppercase tracking-tighter">Verified & Paid</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 space-y-3">
          <Link
            to="/dashboard/myBookedTickets"
            className="btn btn-primary w-full rounded-2xl font-black text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
          >
            <Ticket size={18} /> View My Bookings <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/"
            className="btn btn-ghost w-full rounded-2xl font-bold opacity-60 hover:opacity-100 flex items-center justify-center gap-2"
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>

        <p className="mt-8 text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">
          Securely Processed by Stripe
        </p>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;