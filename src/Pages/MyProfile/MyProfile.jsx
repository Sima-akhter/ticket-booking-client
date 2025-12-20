import React from "react";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";
import { LogOut, Mail, User, Shield, Users } from "lucide-react";
import { toast } from "react-toastify";

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
        return { color: "bg-red-100 text-red-700 border-red-200", icon: <Shield className="w-5 h-5" />, label: "Admin" };
      case "vendor":
        return { color: "bg-blue-100 text-blue-700 border-blue-200", icon: <Users className="w-5 h-5" />, label: "Vendor" };
      default:
        return { color: "bg-purple-100 text-purple-700 border-purple-200", icon: <User className="w-5 h-5" />, label: "User" };
    }
  };

  const roleInfo = getRoleBadge(user?.role);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
              My Profile
            </span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg">Manage your account and view your role in TicketBari</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-8 text-center">
              <div className="relative mb-6 inline-block">
                <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-xl group">
                  <img
                    src={authUser?.photoURL || user?.photoURL || "https://i.ibb.co.com/0jD3Z7k/user.png"}
                    alt={authUser?.displayName || "User"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white"></div>
              </div>

              <h2 className="text-3xl font-extrabold text-gray-800 mb-3">
                {authUser?.displayName || user?.name || "User"}
              </h2>

              <div className="flex justify-center gap-3 mb-6">
                <span className={`px-6 py-3 rounded-full font-bold text-lg border-2 flex items-center gap-2 ${roleInfo.color}`}>
                  {roleInfo.icon}
                  {roleInfo.label}
                </span>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-4 text-gray-700">
                  <Mail className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{authUser?.email || user?.email}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="mt-8 w-full btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-full shadow-xl hover:shadow-purple-500 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Role Information */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Role & Permissions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 mb-3">Your Current Role</p>
                  <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-xl ${roleInfo.color}`}>
                    {roleInfo.icon}
                    {roleInfo.label}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-3">What You Can Do</p>
                  <ul className="space-y-2">
                    {user?.role === "admin" && (
                      <>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Manage all users & tickets</li>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Approve/Reject tickets</li>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Advertise tickets on homepage</li>
                      </>
                    )}
                    {user?.role === "vendor" && (
                      <>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Add & manage your tickets</li>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Accept/Reject booking requests</li>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> View revenue overview</li>
                      </>
                    )}
                    {(!user?.role || user?.role === "user") && (
                      <>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Browse & book tickets</li>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> View booked tickets</li>
                        <li className="flex items-center gap-3 text-gray-700"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Make secure payments</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600">Account Created</p>
                  <p className="text-xl font-semibold">January 2025</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Login</p>
                  <p className="text-xl font-semibold">Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;