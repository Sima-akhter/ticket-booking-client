
import React from 'react';
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
    <section className="my-10 lg:py-20 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4">
          <span className="text-3xl font-bold text-center mb-6">
            Popular Routes
          </span>
        </h2>

        <p className="text-center text-base-content/70 text-lg mb-12 max-w-3xl mx-auto">
          Most booked and loved bus routes across Bangladesh – comfortable, safe, and affordable
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {routes.map((route, index) => (
            <div
              key={index}
              className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary/40"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

              <div className="relative p-8 text-center z-20 space-y-5">
                {/* Route Name */}
                <h3 className="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                  {route.from} → {route.to}
                </h3>

                {/* Duration & Price */}
                <div className="space-y-3">
                  <p className="text-base-content/80 text-lg">
                    <span className="font-semibold">Duration:</span> {route.duration}
                  </p>

                  <p className="text-3xl sm:text-4xl font-extrabold text-primary">
                    {route.price}
                  </p>
                </div>

                {/* Book Now Button - appears on hover */}
                <Link
                  to="/allTickets"
                  className="mt-4 inline-block w-full sm:w-auto px-10 py-3.5 bg-primary text-primary-content font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-primary-focus transform hover:scale-[1.03] transition-all duration-300 opacity-100 sm:opacity-0 group-hover:opacity-100"
                >
                  Book Now →
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