import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTicketAlt, FaMapMarkerAlt, FaBus, FaDollarSign, FaCalendarAlt, FaImage, FaUser, FaEnvelope, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const AddTicket = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

//   const handleAddTicket = async (data) => {
   
//     const selectedPerks = Object.keys(data.perks || {}).filter(key => data.perks[key]);
//     const ticketData = {
//       ...data,
//       perks: selectedPerks,
//       price: parseFloat(data.price),
//       ticketQuantity: parseInt(data.ticketQuantity),
//       vendorName: user?.displayName || data.vendorName,
//       vendorEmail: user?.email || data.vendorEmail,
//     };

//     try {
//       const res = await axiosSecure.post("/tickets", ticketData);
//       console.log("Ticket Added:", res.data);

//     } catch (error) {
//       console.error("Error adding ticket:", error);
//     }
//   };


const handleAddTicket = async (data) => {
  const selectedPerks = Object.keys(data.perks || {}).filter(
    key => data.perks[key]
  );

  const ticketData = {
    ...data,
    perks: selectedPerks,
    price: parseFloat(data.price),
    ticketQuantity: parseInt(data.ticketQuantity),
    vendorName: user?.displayName,
    vendorEmail: user?.email,
    status: "pending", 
  };

  try {
    const res = await axiosSecure.post("/tickets", ticketData);

    if (res.data?.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Ticket Added!",
        text: "Your ticket has been submitted for admin approval.",
        confirmButtonColor: "#7c3aed",
      });
    }
  } catch (error) {
    console.error("Error adding ticket:", error);

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Failed to add ticket. Please try again.",
      confirmButtonColor: "#dc2626",
    });
  }
};




  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
            Add New Ticket
          </span>
        </h2>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 p-8 md:p-12">
          <form onSubmit={handleSubmit(handleAddTicket)} className="grid grid-cols-1 md:grid-cols-2 gap-8">

           
            <div className="relative">
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-2">
                <FaTicketAlt className="text-purple-600" /> Ticket Title
              </label>
              <input
                type="text"
                {...register("ticketTitle", { required: "Ticket title is required" })}
                className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
                placeholder="e.g., Dhaka to Cox's Bazar Deluxe"
              />
              {errors.ticketTitle && <p className="text-red-500 text-sm mt-2">{errors.ticketTitle.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="text-purple-600" /> From
                </label>
                <input
                  type="text"
                  {...register("from", { required: "From location is required" })}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
                  placeholder="Dhaka"
                />
                {errors.from && <p className="text-red-500 text-sm mt-2">{errors.from.message}</p>}
              </div>
              <div className="relative">
                <label className="text-lg font-semibold text-gray-700 mb-2">To</label>
                <input
                  type="text"
                  {...register("to", { required: "To location is required" })}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
                  placeholder="Cox's Bazar"
                />
                {errors.to && <p className="text-red-500 text-sm mt-2">{errors.to.message}</p>}
              </div>
            </div>

            
            <div className="relative">
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-2">
                <FaBus className="text-purple-600" /> Transport Type
              </label>
              <select
                {...register("transportType", { required: "Transport type is required" })}
                className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
              >
                <option value="">Select transport</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Launch">Launch</option>
                <option value="Plane">Plane</option>
              </select>
              {errors.transportType && <p className="text-red-500 text-sm mt-2">{errors.transportType.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-2">
                  <FaDollarSign className="text-purple-600" /> Price (per unit)
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required", min: 1 })}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
                  placeholder="1200"
                />
                {errors.price && <p className="text-red-500 text-sm mt-2">Valid price required</p>}
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-700 mb-2">Ticket Quantity</label>
                <input
                  type="number"
                  {...register("ticketQuantity", { required: "Quantity is required", min: 1 })}
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
                  placeholder="50"
                />
                {errors.ticketQuantity && <p className="text-red-500 text-sm mt-2">Valid quantity required</p>}
              </div>
            </div>

           
            <div className="relative">
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="text-purple-600" /> Departure Date & Time
              </label>
              <input
                type="datetime-local"
                {...register("departureDateTime", { required: "Date & time is required" })}
                className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
              />
              {errors.departureDateTime && <p className="text-red-500 text-sm mt-2">{errors.departureDateTime.message}</p>}
            </div>

            
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-2">
                <FaImage className="text-purple-600" /> Image URL (from ImgBB)
              </label>
              <input
                type="url"
                {...register("imageUrl", { required: "Image URL is required" })}
                className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none"
                placeholder="https://i.ibb.co/..."
              />
              {errors.imageUrl && <p className="text-red-500 text-sm mt-2">{errors.imageUrl.message}</p>}
            </div>

          
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-700 mb-4">
                <FaCheck className="text-purple-600" /> Select Perks
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["AC", "Non-AC", "Breakfast", "WiFi", "Lunch", "Dinner", "Charging Port", "Entertainment"].map((perk) => (
                  <label key={perk} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value={perk}
                      {...register("perks")}
                      className="hidden"
                    />
                    <div className="w-7 h-7 rounded-lg border-2 border-gray-300 group-hover:border-purple-500 transition-all duration-300 flex items-center justify-center">
                      <FaCheck className="text-purple-600 text-sm opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-gray-700 group-hover:text-purple-600 transition-colors">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

          
            <div className="flex items-center gap-3">
              <FaUser className="text-purple-600 text-xl" />
              <input
                type="text"
                defaultValue={user?.displayName || ""}
                readOnly
                className="w-full px-4 py-4 rounded-xl bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-purple-600 text-xl" />
              <input
                type="email"
                defaultValue={user?.email || ""}
                readOnly
                className="w-full px-4 py-4 rounded-xl bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>

         
            <div className="md:col-span-2 text-center mt-8">
              <button
                type="submit"
                className="w-full md:w-auto px-16 py-5 btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-purple-600 transform hover:scale-105 transition-all duration-300"
              >
                Add Ticket Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTicket;