import React from "react";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { LogOut, Mail, User, Shield, Users, Calendar, Activity, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user: authUser, logOut } = useAuth();
  const { user, isLoading } = useRole();

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully!"))
      .catch((err) => toast.error(err.message));
  };

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return { 
          color: "bg-error/10 text-error border-error/20", 
          icon: <Shield className="w-5 h-5" />, 
          label: "Administrator",
          gradient: "from-red-500 to-rose-600"
        };
      case "vendor":
        return { 
          color: "bg-info/10 text-info border-info/20", 
          icon: <Users className="w-5 h-5" />, 
          label: "Service Vendor",
          gradient: "from-blue-500 to-cyan-600"
        };
      default:
        return { 
          color: "bg-primary/10 text-primary border-primary/20", 
          icon: <User className="w-5 h-5" />, 
          label: "Regular User",
          gradient: "from-purple-500 to-indigo-600"
        };
    }
  };

  const roleInfo = getRoleBadge(user?.role);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-base-200 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
              User <span className="text-primary">Profile</span>
            </h1>
            <p className="text-base-content/60 mt-2 font-medium">Manage your personal information and account security.</p>
          </div>
          <div className="flex gap-3">
             <div className="badge badge-outline badge-lg py-4 px-6 font-bold opacity-70">
                Status: Online
             </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Identity Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden rounded-[2.5rem]">
              <div className={`h-32 w-full bg-gradient-to-r ${roleInfo.gradient}`}></div>
              <div className="px-8 pb-8">
                <div className="relative -mt-16 mb-6">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-[2.5rem] ring ring-base-100 ring-offset-base-100 ring-offset-4 overflow-hidden shadow-2xl">
                      <img
                        src={authUser?.photoURL || user?.photoURL || "https://i.ibb.co/0jD3Z7k/user.png"}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-base-100 shadow-lg"></div>
                </div>

                <h2 className="text-2xl font-black text-base-content mb-1">
                  {authUser?.displayName || user?.name || "Anonymous User"}
                </h2>
                <div className="flex items-center gap-2 text-base-content/60 mb-6 font-medium">
                  <Mail className="w-4 h-4" /> {authUser?.email || user?.email}
                </div>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm mb-8 ${roleInfo.color}`}>
                  {roleInfo.icon}
                  {roleInfo.label}
                </div>

                <div className="divider opacity-50"></div>

                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-block rounded-2xl gap-3 font-bold text-white shadow-lg shadow-error/20"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Details & Permissions */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Role & Permissions Card */}
            <div className="card bg-base-100 shadow-xl border border-base-300 rounded-[2.5rem]">
              <div className="card-body p-8">
                <h3 className="text-xl font-black flex items-center gap-3 mb-6">
                  <Activity className="text-primary" /> Privileges & Access
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 bg-base-200 rounded-3xl border border-base-300">
                    <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Identity Verification</p>
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${roleInfo.color}`}>
                            {roleInfo.icon}
                        </div>
                        <div>
                            <p className="text-lg font-bold">{roleInfo.label}</p>
                            <p className="text-xs opacity-60">Verified Account Access</p>
                        </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest opacity-40">System Capabilities</p>
                    <ul className="space-y-3">
                      {(user?.role === "admin" ? [
                        "Full administrative control over users",
                        "Audit and verify all ticket submissions",
                        "Global marketing & ad management"
                      ] : user?.role === "vendor" ? [
                        "Publish and manage inventory",
                        "Manage booking requests & schedules",
                        "Access financial revenue analytics"
                      ] : [
                        "Real-time ticket browsing & search",
                        "Secure automated payment gateway",
                        "Digital ticket history & management"
                      ]).map((perm, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-semibold opacity-80">
                          <CheckCircle2 className="w-4 h-4 text-success" /> {perm}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Insights */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl border border-base-300 rounded-[2.5rem] p-8 flex-row items-center gap-6">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-black opacity-40 uppercase tracking-tighter">Member Since</p>
                        <p className="text-xl font-black">January 2025</p>
                    </div>
                </div>
                
                <div className="card bg-base-100 shadow-xl border border-base-300 rounded-[2.5rem] p-8 flex-row items-center gap-6">
                    <div className="p-4 bg-secondary/10 rounded-2xl text-secondary">
                        <Shield className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-black opacity-40 uppercase tracking-tighter">Security Status</p>
                        <p className="text-xl font-black text-success">Protected</p>
                    </div>
                </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;