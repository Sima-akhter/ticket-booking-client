
import React from 'react';
import { Link } from 'react-router';
import { FaTicketAlt, FaLock, FaCheckCircle, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy Booking",
      desc: "Book your tickets in just a few clicks with our clean, intuitive, and mobile-friendly interface.",
      icon: <FaTicketAlt className="text-5xl" />,
    },
    {
      title: "Secure Payment",
      desc: "100% secure transactions with industry-standard encryption and trusted payment gateways.",
      icon: <FaLock className="text-5xl" />,
    },
    {
      title: "Trusted Partners",
      desc: "We work only with verified, licensed, and highly-rated transport operators across Bangladesh.",
      icon: <FaCheckCircle className="text-5xl" />,
    },
    {
      title: "24/7 Support",
      desc: "Round-the-clock customer support via phone, chat, and email – we're always here for you.",
      icon: <FaHeadset className="text-5xl" />,
    },
  ];

  return (
    <section className="my-10 lg:py-24 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="text-3xl font-bold text-center mb-6">
              Why Choose TicketBari?
            </span>
          </h2>
          <p className="text-base-content/70 text-lg md:text-xl max-w-3xl mx-auto">
            Simple. Secure. Reliable. Your stress-free travel experience starts here.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-base-100 rounded-2xl p-8 shadow-md hover:shadow-xl 
                         border border-base-300 hover:border-primary/40 
                         transition-all duration-300 overflow-hidden"
            >
              {/* Icon Container */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl 
                               group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="relative bg-base-100 rounded-full p-5 shadow-inner 
                               group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary group-hover:text-primary-focus transition-colors">
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-base-content mb-4 
                            group-hover:text-primary transition-colors text-center">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-base-content/75 leading-relaxed text-center text-sm lg:text-base">
                {feature.desc}
              </p>

              {/* Very subtle background hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Optional CTA at bottom */}
        <div className="text-center mt-16">
         
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;