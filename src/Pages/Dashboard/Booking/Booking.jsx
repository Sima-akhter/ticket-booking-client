

// import { useParams } from "react-router";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const Booking = () => {
//     const {ticketsId} = useParams();
//     const axiosSecure = useAxiosSecure();

//     const {isLoading, data: booking} = useQuery({
//         queryKey: ['booking', ticketsId],
//         queryFn: async () =>{
//             const res = await axiosSecure.get(`/booking/${ticketsId}`);
//             return res.data;
//         }
//     })

//     const handleBooking = async() =>{
//       const bookingInfo = {
//         cost: booking.cost,
//         bookingId: booking._id,
//         userEmail: booking.senderEmail,
//         bookingName: booking.bookingName
//       }

//       const res = await axiosSecure.post('/create-checkout-session', bookingInfo);
//       console.log(res.data);
//       window.location.href = res.data.url;
//     }


//    if(isLoading || !booking){
//      return <div className='text-center'>
//         <span className="loading loading-infinity loading-xl"></span>
//     </div>
//    }

//   return (
//     <div>
//         <h2>Please Pay ${booking.cost} for : {booking.parcelName}</h2>
//         <button onClick={handleBooking} className='btn btn-primary text-black'>Pay</button>
//     </div>
//   )
// }

// export default Booking

import React from 'react'

const Booking = () => {
  return (
    <div>Booking</div>
  )
}

export default Booking