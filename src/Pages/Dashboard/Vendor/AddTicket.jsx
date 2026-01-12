import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { 
  FaTicketAlt, FaMapMarkerAlt, FaBus, FaDollarSign, 
  FaCalendarAlt, FaImage, FaUser, FaEnvelope, 
  FaCheck, FaAlignLeft, FaListUl 
} from "react-icons/fa";
import Swal from "sweetalert2";

const AddTicket = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAddTicket = async (data) => {
    const ticketData = {
      ...data,
      price: parseFloat(data.price),
      ticketQuantity: parseInt(data.ticketQuantity),
      vendorName: user?.displayName,
      vendorEmail: user?.email,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/tickets", ticketData);
      if (res.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Ticket Submitted!",
          text: "Wait for admin approval.",
          confirmButtonColor: "#4F46E5",
        });
        reset(); // ফরমটি খালি করার জন্য
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none text-base-content";
  const labelClass = "flex items-center gap-2 text-sm font-semibold text-base-content/80 mb-2";

  return (
    <section className="py-24 px-4 bg-base-200 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-3xl font-bold text-center mb-6">
              Add New Ticket
            </span>
          </h2>
          <p className="text-base-content/60">Fill in the details to list your transport ticket.</p>
        </div>

        {/* Form Container */}
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-6 md:p-10 transition-all">
          <form onSubmit={handleSubmit(handleAddTicket)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ticket Title */}
              <div className="md:col-span-2">
                <label className={labelClass}><FaTicketAlt className="text-primary"/> Ticket Title</label>
                <input
                  type="text"
                  {...register("ticketTitle", { required: "Title is required" })}
                  className={inputClass}
                  placeholder="e.g., Hanif Enterprise | Dhaka - Cox's Bazar"
                />
                {errors.ticketTitle && <span className="text-error text-xs mt-1">{errors.ticketTitle.message}</span>}
              </div>

              {/* Journey Details */}
              <div>
                <label className={labelClass}><FaMapMarkerAlt className="text-primary"/> From</label>
                <input type="text" {...register("from", { required: true })} className={inputClass} placeholder="Departure Point" />
              </div>
              <div>
                <label className={labelClass}><FaMapMarkerAlt className="text-secondary"/> To</label>
                <input type="text" {...register("to", { required: true })} className={inputClass} placeholder="Destination Point" />
              </div>

              {/* Transport & Schedule */}
              <div>
                <label className={labelClass}><FaBus className="text-primary"/> Transport Type</label>
                <select {...register("transportType", { required: true })} className={inputClass}>
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Launch">Launch</option>
                  <option value="Plane">Plane</option>
                </select>
              </div>
              <div>
                <label className={labelClass}><FaCalendarAlt className="text-primary"/> Departure Date & Time</label>
                <input type="datetime-local" {...register("departureDateTime", { required: true })} className={inputClass} />
              </div>

              {/* Pricing & Quantity */}
              <div>
                <label className={labelClass}><FaDollarSign className="text-primary"/> Price (BDT)</label>
                <input type="number" {...register("price", { required: true })} className={inputClass} placeholder="0.00" />
              </div>
              <div>
                <label className={labelClass}><FaListUl className="text-primary"/> Available Quantity</label>
                <input type="number" {...register("ticketQuantity", { required: true })} className={inputClass} placeholder="e.g., 40" />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className={labelClass}><FaImage className="text-primary"/> Thumbnail Image URL</label>
                <input type="url" {...register("imageUrl", { required: true })} className={inputClass} placeholder="https://i.ibb.co/..." />
              </div>

              {/* Description Field (NEW) */}
              <div className="md:col-span-2">
                <label className={labelClass}><FaAlignLeft className="text-primary"/> Ticket Description</label>
                <textarea 
                  rows="4" 
                  {...register("description", { required: "Description is required" })} 
                  className={`${inputClass} resize-none`}
                  placeholder="Describe details like bus model, boarding point specifics, or any rules..."
                ></textarea>
                {errors.description && <span className="text-error text-xs mt-1">{errors.description.message}</span>}
              </div>

              {/* Perks Selection */}
              <div className="md:col-span-2">
                <label className={labelClass}><FaCheck className="text-primary"/> Facilities / Perks</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                  {["AC", "Non-AC", "WiFi", "Lunch", "Water", "Blanket", "Charging Port", "Music"].map((perk) => (
                    <label key={perk} className="flex items-center gap-2 p-3 rounded-xl border border-base-300 hover:bg-base-200 cursor-pointer transition-all">
                      <input type="checkbox" value={perk} {...register("perks")} className="checkbox checkbox-primary checkbox-sm" />
                      <span className="text-sm font-medium">{perk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vendor Info (Read-Only) */}
              <div className="p-4 bg-base-200 rounded-2xl flex items-center gap-4">
                 <FaUser className="text-primary" />
                 <div>
                   <p className="text-[10px] uppercase opacity-50 font-bold">Vendor Name</p>
                   <p className="text-sm font-semibold">{user?.displayName}</p>
                 </div>
              </div>
              <div className="p-4 bg-base-200 rounded-2xl flex items-center gap-4">
                 <FaEnvelope className="text-primary" />
                 <div>
                   <p className="text-[10px] uppercase opacity-50 font-bold">Contact Email</p>
                   <p className="text-sm font-semibold truncate">{user?.email}</p>
                 </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-focus text-primary-content font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              >
                Publish Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTicket;