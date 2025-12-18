import React from 'react';
import { FaBus } from "react-icons/fa";
import { Link } from 'react-router';

const PopularRoutes = () => {
  const routes = [
    { from: "Dhaka", to: "Chattogram", price: "৳1200", duration: "6 Hours" },
    { from: "Dhaka", to: "Sylhet", price: "৳900", duration: "5 Hours" },
    { from: "Dhaka", to: "Rajshahi", price: "৳800", duration: "6.5 Hours" },
    { from: "Dhaka", to: "Cox's Bazar", price: "৳1500", duration: "10 Hours" },
    { from: "Dhaka", to: "Khulna", price: "৳1000", duration: "7 Hours" },
    { from: "Chattogram", to: "Cox's Bazar", price: "৳700", duration: "4 Hours" },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
            Popular Routes
          </span>{" "}
          🚍
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Most booked bus routes across Bangladesh – comfortable, affordable & reliable
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 bg-white"
            >
             
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10"></div>

              <div className="relative p-8 text-center z-20">
                <div className="mb-6">
                  <FaBus className="text-7xl mx-auto text-purple-600 group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-500">
                  {route.from} → {route.to}
                </h3>

                <div className="mt-4 space-y-3">
                  <p className="text-gray-600 group-hover:text-pink-100 transition-colors duration-500">
                    <span className="font-semibold">Duration:</span> {route.duration}
                  </p>
                  <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-white group-hover:to-pink-200 transition-all duration-500">
                    {route.price}
                  </p>
                </div>

                <Link
                  to="/allTickets"
                  className="mt-6 inline-block btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-purple-500 transform hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;