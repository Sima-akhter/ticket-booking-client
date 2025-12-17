

// import useAuth from "../../../hooks/useAuth";

// const AddTicket = () => {
//   const { user } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const ticket = {
//       ticketTitle: form.title.value,
//       from: form.from.value,
//       to: form.to.value,
//       transportType: form.transport.value,
//       price: form.price.value,
//       ticketQuantity: form.quantity.value,
//       departureDateTime: form.datetime.value,
//       perks: form.perks.value.split(","),
//       imageUrl: form.image.value,
//       vendorName: user.displayName,
//       vendorEmail: user.email,
//     };
//     console.log(ticket);
    

//     // fetch("http://localhost:3000/tickets", {
//     //   method: "POST",
//     //   headers: { "content-type": "application/json" },
//     //   body: JSON.stringify(ticket),
//     // });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//       <input name="title" placeholder="Ticket Title" />
//       <input name="from" placeholder="From" />
//       <input name="to" placeholder="To" />
//       <input name="transport" placeholder="Transport Type" />
//       <input name="price" placeholder="Price" />
//       <input name="quantity" placeholder="Quantity" />
//       <input name="datetime" type="datetime-local" />
//       <input name="perks" placeholder="AC, WiFi" />
//       <input name="image" placeholder="Image URL" />
//       <input value={user.displayName} readOnly />
//       <input value={user.email} readOnly />
//       <button className="btn btn-primary col-span-2">Add Ticket</button>
//     </form>
//   );
// };

// export default AddTicket;




import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddTicket = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAddTicket = async (data) => {



    try {
      const res = await axiosSecure.post("/tickets", data);
      console.log("Ticket Added:", res.data);
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-10">
        
        <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
          Add New Ticket
        </h2>

        {/* FORM START */}
        <form
          onSubmit={handleSubmit(handleAddTicket)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >

          {/* Ticket Title */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Ticket Title</label>
            <input
              type="text"
              {...register("ticketTitle", { required: true })}
              className="input input-bordered w-full focus:ring-2 focus:ring-neutral/50"
              placeholder="Enter ticket title"
            />
            {errors.ticketTitle && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* From - To */}
          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-2">
              <label className="text-gray-700 font-medium">From</label>
              <input
                type="text"
                {...register("from", { required: true })}
                className="input input-bordered w-full"
                placeholder="Dhaka"
              />
              {errors.from && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="text-gray-700 font-medium">To</label>
              <input
                type="text"
                {...register("to", { required: true })}
                className="input input-bordered w-full"
                placeholder="Chittagong"
              />
              {errors.to && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>

          {/* Transport Type */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Transport Type</label>
            <input
              type="text"
              {...register("transportType", { required: true })}
              className="input input-bordered w-full"
              placeholder="Bus / Train / Air"
            />
            {errors.transportType && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">
              Price (per unit)
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter price"
            />
            {errors.price && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Ticket Quantity */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">
              Ticket Quantity
            </label>
            <input
              type="number"
              {...register("ticketQuantity", { required: true })}
              className="input input-bordered w-full"
              placeholder="Total tickets"
            />
            {errors.ticketQuantity && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Departure Date */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">
              Departure Date & Time
            </label>
            <input
              type="datetime-local"
              {...register("departureDateTime", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.departureDateTime && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Perks */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <label className="text-gray-700 font-medium">Perks</label>

            <div className="flex flex-wrap gap-6 text-gray-700">

              <label className="flex items-center gap-2">
                <input type="checkbox" value="AC" {...register("perks")} /> AC
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="Non-AC" {...register("perks")} /> Non-AC
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="Breakfast" {...register("perks")} /> Breakfast
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="WiFi" {...register("perks")} /> Wi-Fi
              </label>

            </div>
          </div>

          {/* Image URL */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Image URL</label>
            <input
              type="url"
              {...register("imageUrl", { required: true })}
              className="input input-bordered w-full"
              placeholder="Paste image URL here"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Vendor Name */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Vendor Name</label>
            <input
              defaultValue={user?.displayName}
              type="text"
              {...register("vendorName", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.vendorName && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Vendor Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Vendor Email</label>
            <input
              defaultValue={user?.email}
              type="email"
              {...register("vendorEmail", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.vendorEmail && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-6">
            <button className="btn btn-neutral w-full text-lg py-3 rounded-xl hover:bg-neutral-700 transition-all">
              Add Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTicket;

