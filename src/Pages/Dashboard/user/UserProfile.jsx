import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa";

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
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg border border-gray-200">
        {/* Profile Image */}
        <div className="flex justify-center -mt-16">
          <img
            src={userProfile?.photoURL || "/default-avatar.png"}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-2xl font-extrabold text-center mt-4 text-gray-800">
          {userProfile?.name || "User Name"}
        </h2>

        {/* Role */}
        <p className="flex justify-center items-center mt-2 text-blue-600 font-semibold gap-2">
          <FaIdBadge /> {userProfile?.role || "User"}
        </p>

        {/* Email */}
        <div className="mt-6">
          <h3 className="text-gray-500 font-medium flex items-center gap-2">
            <FaEnvelope /> Email
          </h3>
          <p className="text-gray-700 text-lg">{userProfile?.email || "user@example.com"}</p>
        </div>

        {/* Username */}
        {userProfile?.username && (
          <div className="mt-4 flex justify-center items-center gap-2 text-gray-600">
            <FaUser /> <span>{userProfile.username}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
