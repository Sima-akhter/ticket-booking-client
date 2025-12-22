

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield, FaEnvelope, FaUser } from "react-icons/fa";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: admin = {}, isLoading } = useQuery({
    queryKey: ["admin-profile", user?.email],
    enabled: !!user?.email, // wait until user loads
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/profile/${user.email}`);
      return res.data;
    },
  });
console.log(admin)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading admin profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg border border-gray-200">
        {/* Profile Image */}
        <div className="flex justify-center -mt-16">
          <img
            src={admin?.photoURL || "/default-avatar.png"}
            alt="Admin"
            referrerPolicy="no-referrer"
            className="w-32 h-32 rounded-full border-4 border-purple-500 shadow-lg object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-extrabold text-center mt-4 text-gray-800">
          {admin?.name || "Admin Name"}
        </h2>

        {/* Role */}
        <p className="flex justify-center items-center mt-2 text-purple-600 font-semibold gap-2">
          <FaUserShield /> {admin?.role || "Admin"}
        </p>

        
        <div className="mt-6">
          <h3 className="text-gray-500 font-medium flex items-center gap-2">
            <FaEnvelope /> Email
          </h3>
          <p className="text-gray-700 text-lg">{admin?.email || "admin@example.com"}</p>
        </div>

        
        {admin?.additionalInfo && (
          <div className="mt-4">
            <h3 className="text-gray-500 font-medium">Additional Info</h3>
            <p className="text-gray-700">{admin.additionalInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
