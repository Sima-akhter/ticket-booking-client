import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserTie, FaEnvelope, FaStore, FaEdit } from "react-icons/fa";

const VendorProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: vendor = {}, isLoading } = useQuery({
    queryKey: ["vendor-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendors/profile/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="h-64 flex justify-center items-center"><span className="loading loading-spinner text-primary"></span></div>;

  return (
    <div className="min-h-screen bg-base-200/50 py-10 px-4">
      <div className="max-w-3xl mx-auto rounded-2xl bg-base-100 shadow-md overflow-hidden border border-base-300">
        <div className="h-32 w-full bg-primary/10 border-b border-base-200" />
        <div className="px-8 pb-10">
          <div className="flex justify-center -mt-16">
            <img src={vendor?.photoURL || "/default-avatar.png"} className="w-32 h-32 rounded-2xl ring-4 ring-base-100 shadow-xl object-cover" />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-black text-base-content uppercase">{vendor?.name}</h2>
            <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1 flex justify-center items-center gap-2">
              <FaUserTie /> {vendor?.role || "Vendor Partner"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-5 bg-base-200/50 rounded-xl border border-base-300 flex items-center gap-4">
              <div className="text-primary text-xl opacity-40"><FaEnvelope /></div>
              <div><p className="text-[10px] font-black opacity-50 uppercase">Email</p><p className="font-bold text-sm">{vendor?.email}</p></div>
            </div>
            <div className="p-5 bg-base-200/50 rounded-xl border border-base-300 flex items-center gap-4">
              <div className="text-primary text-xl opacity-40"><FaStore /></div>
              <div><p className="text-[10px] font-black opacity-50 uppercase">Business</p><p className="font-bold text-sm">{vendor?.companyName || "Independent"}</p></div>
            </div>
          </div>
          <button className="w-full mt-8 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
             Update Profile Info →
          </button>
        </div>
      </div>
    </div>
  );
};
export default VendorProfile;