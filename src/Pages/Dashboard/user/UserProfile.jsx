import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaIdBadge, FaShieldAlt, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userProfile = {}, isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60 font-medium mt-4 animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        {/* Profile Card */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden relative">
          
          {/* Header Accent - matching TicketCard primary color */}
          <div className="h-32 w-full bg-primary/10 border-b border-base-200" />

          <div className="px-8 pb-10">
            {/* Profile Image with Ring Effect */}
            <div className="flex justify-center -mt-16 relative">
              <div className="relative group">
                <img
                  src={userProfile?.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-36 h-36 rounded-2xl border-4 border-base-100 shadow-2xl object-cover ring-1 ring-base-300"
                />
                <div className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-lg shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <FaCamera size={14} />
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mt-6">
              <h2 className="text-3xl font-black text-base-content tracking-tight">
                {userProfile?.name || "Member Name"}
              </h2>
              <div className="flex justify-center mt-3">
                <span className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest border border-primary/20">
                  <FaShieldAlt className="text-[10px]" />
                  {userProfile?.role || "User"}
                </span>
              </div>
            </div>

            <div className="divider opacity-30 my-8">Account Details</div>

            {/* Info Fields */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="flex items-center gap-4 p-5 bg-base-200/50 rounded-2xl border border-base-300 group hover:border-primary/40 transition-all">
                <div className="p-3 bg-base-100 rounded-xl text-primary shadow-sm">
                  <FaEnvelope />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Registered Email</p>
                  <p className="font-bold text-base-content truncate">{userProfile?.email}</p>
                </div>
              </div>

              {/* Username Card */}
              <div className="flex items-center gap-4 p-5 bg-base-200/50 rounded-2xl border border-base-300 group hover:border-primary/40 transition-all">
                <div className="p-3 bg-base-100 rounded-xl text-primary shadow-sm">
                  <FaUser />
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Username</p>
                  <p className="font-bold text-base-content">
                    @{userProfile?.username || userProfile?.name?.split(" ")[0].toLowerCase() || "user"}
                  </p>
                </div>
              </div>

              {/* Account ID Card */}
              <div className="flex items-center gap-4 p-5 bg-base-200/50 rounded-2xl border border-base-300 group hover:border-primary/40 transition-all">
                <div className="p-3 bg-base-100 rounded-xl text-primary shadow-sm">
                  <FaIdBadge />
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Account ID</p>
                  <p className="font-mono text-xs font-bold opacity-60 uppercase">
                    ID-{userProfile?._id?.slice(-10) || "001245"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-10 bg-primary text-primary-content font-black py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:bg-primary-focus transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
               Edit Profile Settings →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;