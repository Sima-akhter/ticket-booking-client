import React from 'react';
import { Link } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaCcVisa, FaCcMastercard, FaCcStripe, FaMobileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-purple-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo + Description */}
          <aside className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <Logo />
              
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
              Book bus, train, launch & flight tickets easily – your trusted travel partner across Bangladesh.
            </p>
          </aside>

          {/* Column 2: Quick Links */}
          <nav className="space-y-4">
            <h6 className="text-2xl font-bold text-white mb-6">Quick Links</h6>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                Home
              </Link>
              <Link to="/allTickets" className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                All Tickets
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                Contact Us
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-purple-400 transition-colors duration-300 text-lg">
                About Us
              </Link>
            </div>
          </nav>

          {/* Column 3: Contact Info */}
          <nav className="space-y-4">
            <h6 className="text-2xl font-bold text-white mb-6">Contact Info</h6>
            <div className="space-y-4 text-gray-400">
              <a href="mailto:support@ticketbari.com" className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                <FaEnvelope className="text-xl text-purple-500" />
                <span className="text-lg">support@ticketbari.com</span>
              </a>
              <a href="tel:+880123456789" className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                <FaPhoneAlt className="text-xl text-purple-500" />
                <span className="text-lg">+880 123 456 789</span>
              </a>
              <a href="https://facebook.com/ticketbari" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-purple-400 transition-colors">
                <FaFacebookF className="text-xl text-purple-500" />
                <span className="text-lg">facebook.com/ticketbari</span>
              </a>
            </div>
          </nav>

          {/* Column 4: Payment Methods */}
          <nav className="space-y-4">
            <h6 className="text-2xl font-bold text-white mb-6">Payment Methods</h6>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-purple-900/50 transition-all duration-300 border border-purple-800/50 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20">
                <FaCcStripe className="text-4xl text-white" />
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-purple-900/50 transition-all duration-300 border border-purple-800/50 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20">
                <FaCcVisa className="text-4xl text-white" />
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-purple-900/50 transition-all duration-300 border border-purple-800/50 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20">
                <FaCcMastercard className="text-4xl text-white" />
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-purple-900/50 transition-all duration-300 border border-purple-800/50 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20">
                <FaMobileAlt className="text-4xl text-white" title="bKash / Nagad" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Secure payments powered by industry-leading gateways
            </p>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-lg">
            © 2025 <span className="font-bold text-purple-400">TicketBari</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;