import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookingSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.transactionId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-white px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-purple-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-purple-700 mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your booking has been completed successfully.
        </p>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 text-left space-y-4">
          <div>
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-semibold text-gray-800 break-all">
              {paymentInfo.transactionId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tracking ID</p>
            <p className="font-semibold text-gray-800 break-all">
              {paymentInfo.trackingId}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="btn bg-white border-purple-600 text-purple-700 hover:bg-purple-600 hover:text-white rounded-full px-6"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard/myBookedTickets"
            className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6"
          >
            My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
