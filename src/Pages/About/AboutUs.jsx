// src/pages/AboutUs.jsx
import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {
  return (
    <section className="py-16 lg:py-20 px-4  min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="text-3xl font-bold text-center mb-6">
              About TicketBari
            </span>
          </h1>
          <p className="text-base-content/70 text-lg md:text-xl max-w-3xl mx-auto">
            Connecting travelers across Bangladesh with safe, reliable, and affordable journeys.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
          {/* Left - Text Content */}
          <div className="space-y-10">
            {/* Who We Are */}
            <div className="bg-base-100 rounded-2xl p-8 shadow-md border border-base-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-base-content">
                Who We Are
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                TicketBari is a next-generation online ticketing platform that makes booking bus, train, launch, and flight tickets simple, fast, and secure. 
                We connect passengers directly with trusted transport operators across 64 districts of Bangladesh.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-base-100 rounded-2xl p-8 shadow-md border border-base-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-base-content">
                Our Mission
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                To revolutionize travel booking in Bangladesh by providing a seamless, transparent, and customer-first experience — from search to journey completion.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-base-100 rounded-2xl p-8 shadow-md border border-base-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-base-content">
                Our Vision
              </h2>
              <p className="text-base-content/80 leading-relaxed">
                To become the most trusted and preferred digital ticketing solution in Bangladesh, setting new benchmarks in reliability, innovation, and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Right - Core Values + CTA */}
          <div className="space-y-10">
            {/* Core Values */}
            <div className="bg-base-100 rounded-2xl p-8 shadow-md border border-base-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-base-content">
                Our Core Values
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Customer First", icon: "❤️" },
                  { title: "Security & Trust", icon: "🔒" },
                  { title: "Speed & Reliability", icon: "⚡" },
                  { title: "Innovation & Growth", icon: "🚀" },
                  { title: "Transparency", icon: "🔍" },
                  { title: "Sustainability", icon: "🌱" },
                ].map((value, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-base-200 rounded-xl hover:bg-base-300 transition-colors"
                  >
                    <span className="text-3xl">{value.icon}</span>
                    <h3 className="font-semibold text-base-content">{value.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 shadow-md border border-primary/20 text-center">
              <h3 className="text-2xl font-bold mb-4 text-base-content">
                Ready to Travel Smarter?
              </h3>
              <p className="text-base-content/80 mb-6">
                Join thousands of happy travelers who choose TicketBari every day.
              </p>
              <Link
                to="/allTickets"
                className="btn btn-primary btn-lg px-12 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
              >
                Explore Routes →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Stats / Fun Fact */}
        <div className="mt-16 text-center">
          <div className="stats shadow-lg bg-base-100">
            <div className="stat">
              <div className="stat-title text-base-content/70">Districts Covered</div>
              <div className="stat-value text-primary">64</div>
            </div>
            <div className="stat">
              <div className="stat-title text-base-content/70">Happy Travelers</div>
              <div className="stat-value text-primary">+50,000</div>
            </div>
            <div className="stat">
              <div className="stat-title text-base-content/70">Tickets Booked</div>
              <div className="stat-value text-primary">100K+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;