
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield, FaEnvelope, FaIdBadge, FaCalendarCheck, FaChartPie, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: admin = {}, isLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/profile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    // ব্যাকগ্রাউন্ডে বাটনের কালারের হালকা একটি শেড দেওয়া হয়েছে
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-base-100 via-primary/5 to-base-100 dark:from-base-300 dark:via-primary/10 dark:to-base-300 transition-all duration-500">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl mx-auto"
      >
        {/* Profile Card Header */}
        <div className="relative group overflow-hidden rounded-t-[2.5rem] shadow-2xl">
          <div className="h-40 md:h-56 bg-gradient-to-r from-primary via-indigo-600 to-secondary animate-gradient-x"></div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-base-100/80 backdrop-blur-xl shadow-2xl rounded-b-[2.5rem] px-6 md:px-12 pb-12 border-x border-b border-primary/10 relative">
          
          {/* Avatar Area */}
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-24 mb-8 md:ml-4 gap-6">
            <div className="relative">
              <div className="avatar">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full ring-8 ring-base-100 shadow-2xl overflow-hidden bg-base-300">
                  <img 
                    src={admin?.photoURL || "https://i.ibb.co/mJR9Qxc/user.png"} 
                    alt="Admin"
                    referrerPolicy="no-referrer"
                    className="object-cover"
                  />
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-base-100">
                <FaEdit size={14} />
              </button>
            </div>

            <div className="text-center md:text-left mb-2 flex-1">
              <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight">
                {admin?.name || "Admin Name"}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                <span className="badge badge-primary badge-lg py-4 px-6 gap-2 font-bold shadow-lg shadow-primary/20">
                  <FaUserShield /> {admin?.role || "System Administrator"}
                </span>
                <span className="badge badge-outline badge-lg py-4 px-6 border-primary/30 text-primary font-bold">
                  Active Member
                </span>
              </div>
            </div>
          </div>

          {/* Stats Section with Matching Primary Color */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            
            {/* Left: Info Grid */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="group p-6 rounded-3xl bg-base-100 border border-primary/10 hover:border-primary/40 transition-all shadow-sm hover:shadow-indigo-500/10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <FaEnvelope size={24} />
                </div>
                <p className="text-xs font-black uppercase text-base-content/40 tracking-widest mb-1">Email Address</p>
                <p className="font-bold text-lg truncate">{admin?.email || "N/A"}</p>
              </div>

              <div className="group p-6 rounded-3xl bg-base-100 border border-primary/10 hover:border-primary/40 transition-all shadow-sm hover:shadow-indigo-500/10">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                  <FaCalendarCheck size={24} />
                </div>
                <p className="text-xs font-black uppercase text-base-content/40 tracking-widest mb-1">Account Since</p>
                <p className="font-bold text-lg">January 2024</p>
              </div>

              <div className="md:col-span-2 p-8 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FaIdBadge size={80} />
                </div>
                <h4 className="font-black text-primary uppercase tracking-tighter mb-3">About Me</h4>
                <p className="text-base-content/70 leading-relaxed relative z-10">
                  {admin.additionalInfo || "System administrator responsible for managing ticket distribution, vendor approvals, and overall platform security. Passionate about creating seamless travel experiences."}
                </p>
              </div>
            </div>

            {/* Right: Modern Stat Cards */}
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-primary to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/30">
                <div className="flex justify-between items-center mb-6">
                  <FaChartPie size={28} className="opacity-80" />
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase">Today</span>
                </div>
                <p className="text-sm font-medium opacity-80">Total Revenue Managed</p>
                <h3 className="text-3xl font-black mt-1">TK 45,280</h3>
                <div className="mt-6 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-2/3 shadow-[0_0_10px_white]"></div>
                </div>
              </div>

              <div className="bg-base-100 p-6 rounded-[2.5rem] border border-primary/10 shadow-sm flex items-center gap-5">
                <div className="radial-progress text-primary" style={{"--value":70, "--size": "3rem", "--thickness": "4px"}} role="progressbar">70%</div>
                <div>
                  <p className="font-black text-base-content">Task Completed</p>
                  <p className="text-xs opacity-50 font-bold">12 Active Tickets</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;