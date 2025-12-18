import React from 'react';
import { FaTicketAlt, FaLock, FaCheckCircle, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy Booking",
      desc: "Book your tickets in just a few clicks with our intuitive and smooth interface.",
      icon: <FaTicketAlt className="text-5xl" />,
    },
    {
      title: "Secure Payment",
      desc: "100% secure transactions with encrypted payment gateways you can trust.",
      icon: <FaLock className="text-5xl" />,
    },
    {
      title: "Trusted Vendors",
      desc: "Partnered only with verified and reliable transport providers across the country.",
      icon: <FaCheckCircle className="text-5xl" />,
    },
    {
      title: "24/7 Support",
      desc: "Dedicated customer support team available round the clock for any assistance.",
      icon: <FaHeadset className="text-5xl" />,
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
            Why Choose TicketBari?
          </span>
        </h2>
        <p className="text-center text-gray-700 text-lg mb-16 max-w-3xl mx-auto">
          We make travel planning simple, secure, and enjoyable – your perfect journey starts here!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 text-center border border-purple-100"
            >
              {/* Gradient Circle Background for Icon */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-full p-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <div className="text-purple-600 group-hover:text-purple-700">
                    {item.icon}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>

              {/* Subtle Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;