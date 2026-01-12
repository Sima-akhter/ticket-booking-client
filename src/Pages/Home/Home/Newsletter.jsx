// src/components/Newsletter.jsx

import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

   
    setTimeout(() => {
      
      if (Math.random() > 0.1) {
        setStatus('success');
        setMessage('Thank you! You have successfully subscribed to our newsletter.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again later.');
      }
    }, 1200);
  };

  return (
    <section className="py-16 lg:py-20 px-4 bg-base-100 my-10">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Stay Updated with TicketBari
        </h2>

        <p className="text-base-content/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get exclusive deals, travel tips, and the latest updates 
          on bus, train, launch, and flight tickets across Bangladesh.
        </p>

        {/* Form */}
        <form 
          onSubmit={handleSubmit} 
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input input-bordered w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={status === 'loading'}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto px-10 min-h-12"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Subscribing...
              </>
            ) : (
              'Subscribe Now'
            )}
          </button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mt-6 alert alert-success shadow-lg max-w-xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 alert alert-error shadow-lg max-w-xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;