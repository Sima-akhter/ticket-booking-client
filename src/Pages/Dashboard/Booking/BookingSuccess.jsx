// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";


// const BookingSuccess = () => {
//     const [searchParams] = useSearchParams();
//     const [paymentInfo, setPaymentInfo] = useState({});
//     const sessionId = searchParams.get('session_id');
//     const axiosSecure = useAxiosSecure();

//     console.log(sessionId);

//     useEffect(()=>{

//         if(sessionId){
//           axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
//           .then(res =>{
//             console.log(res.data)
//             setPaymentInfo({
//                 transactionId: res.data.transactionId,
//                 trackingId : res.data.transactionId
//             })
//           })
//         }

//     }, [sessionId, axiosSecure])

//   return (
//     <div>
//         <h1 className='text-4xl'>Payment successful</h1>
//         <p>Your TransactionId: {paymentInfo.transactionId}</p>
//         <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
//     </div>
//   )
// }

// export default BookingSuccess


import React from 'react'

const BookingSuccess = () => {
  return (
    <div>BookingSuccess</div>
  )
}

export default BookingSuccess