import React from "react";
import useAuth from "../../../hooks/useAuth";
import userimg from '../../../assets/user.png'; 

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-80"></div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
            My Profile
          </span>
        </h2>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 overflow-hidden">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-32 relative">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative group">
                {/* Profile Picture */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-8 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={user?.photoURL || userimg}
                    alt={user?.displayName || "User"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Online Indicator (optional) */}
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-12 px-8 text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
              {user?.displayName || "Anonymous User"}
            </h3>
            <p className="text-xl text-gray-600 mb-6">
              {user?.email || "No email provided"}
            </p>

            {/* Role Badge */}
            <div className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-xl">
              User Role
            </div>

            {/* Additional Info Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-2xl mx-auto">
              <div className="bg-purple-50/70 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-purple-700 mb-2">Account Type</h4>
                <p className="text-gray-700 text-2xl font-bold">Standard User</p>
              </div>
              <div className="bg-pink-50/70 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-pink-700 mb-2">Member Since</h4>
                <p className="text-gray-700 text-2xl font-bold">
                  {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Recently"}
                </p>
              </div>
              <div className="bg-purple-50/70 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-purple-700 mb-2">Login Provider</h4>
                <p className="text-gray-700 text-2xl font-bold capitalize">
                  {user?.providerData[0]?.providerId?.split('.')[0] || "Email"}
                </p>
              </div>
            </div>

            {/* Optional Action Button */}
            <div className="mt-12">
              <button className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-12 py-4 rounded-full shadow-xl hover:shadow-purple-500 transform hover:scale-105 transition-all duration-300 text-lg">
                Edit Profile (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;