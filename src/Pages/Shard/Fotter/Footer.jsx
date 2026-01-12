import React from 'react';
import { Link } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaCcVisa, FaCcMastercard, FaCcStripe, FaMobileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Logo + Description */}
          <aside className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <Logo />
            </Link>
            <p className="text-gray-400 text-base leading-relaxed max-w-xs">
              Book bus, train, launch & flight tickets easily – your trusted travel partner across Bangladesh.
            </p>
          </aside>

          {/* Column 2: Quick Links */}
          <nav className="space-y-4">
            <h6 className="text-xl font-black text-white mb-6 uppercase tracking-wider">Quick Links</h6>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-primary transition-colors duration-300 font-medium">
                Home
              </Link>
              <Link to="/allTickets" className="block text-gray-400 hover:text-primary transition-colors duration-300 font-medium">
                All Tickets
              </Link>
              <Link to="/contactUs" className="block text-gray-400 hover:text-primary transition-colors duration-300 font-medium">
                Contact Us
              </Link>
              <Link to="/aboutUs" className="block text-gray-400 hover:text-primary transition-colors duration-300 font-medium">
                About Us
              </Link>
            </div>
          </nav>

          {/* Column 3: Contact Info */}
          <nav className="space-y-4">
            <h6 className="text-xl font-black text-white mb-6 uppercase tracking-wider">Contact Info</h6>
            <div className="space-y-4 text-gray-400">
              <a href="mailto:support@ticketbari.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-primary/20 transition-all">
                   <FaEnvelope className="text-primary" />
                </div>
                <span className="text-sm font-medium">support@ticketbari.com</span>
              </a>
              <a href="tel:+880123456789" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-primary/20 transition-all">
                   <FaPhoneAlt className="text-primary" />
                </div>
                <span className="text-sm font-medium">+880 123 456 789</span>
              </a>
              <a href="https://facebook.com/ticketbari" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-primary/20 transition-all">
                   <FaFacebookF className="text-primary" />
                </div>
                <span className="text-sm font-medium">facebook.com/ticketbari</span>
              </a>
            </div>
          </nav>

          {/* Column 4: Payment Methods */}
          <nav className="space-y-4">
            <h6 className="text-xl font-black text-white mb-6 uppercase tracking-wider">Payment Methods</h6>
            <div className="flex flex-wrap gap-3">
              {[FaCcStripe, FaCcVisa, FaCcMastercard, FaMobileAlt].map((Icon, index) => (
                <div key={index} className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-3 border border-gray-800 hover:border-primary/50 hover:bg-blue-900/20 transition-all duration-300 group">
                  <Icon className="text-3xl text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4 italic font-medium">
              Secure payments powered by industry-leading gateways
            </p>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            © 2026 <span className="font-black text-primary uppercase tracking-widest">TicketBari</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-bold text-gray-600 uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;