// src/components/FAQ.jsx

import React from 'react';

const faqData = [
  {
    question: "How do I book a ticket on TicketBari?",
    answer: "Booking is simple! Search your route, select your preferred transport, choose seat/date/time, and complete payment in 2 minutes. You'll get instant confirmation via email/SMS.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bKash, Nagad, Rocket, Visa, MasterCard, American Express, and bank cards. All payments are 100% secure with encryption.",
  },
  {
    question: "Can I cancel or change my ticket?",
    answer: "Yes! Most tickets can be cancelled or modified up to 2 hours before departure. Cancellation fees may apply depending on the transport provider. Check our refund policy for details.",
  },
  {
    question: "Is my personal information safe?",
    answer: "Absolutely. We use industry-standard encryption and never share your data with third parties. Your privacy is our top priority.",
  },
  {
    question: "How do I get support if I face any issue?",
    answer: "Our 24/7 support team is here for you. Call us at 01322-901105 / 01322-810874, use live chat on the website, or email us at support@ticketbari.com.",
  },
  {
    question: "Do you offer discounts or promo codes?",
    answer: "Yes! We regularly provide promo codes, student discounts, and seasonal offers. Subscribe to our newsletter to never miss any deal.",
  },
  {
    question: "What if my bus/train/flight is delayed?",
    answer: "We send real-time updates via SMS/email. You can track your journey live on the website. In case of major delays, you may be eligible for compensation.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 lg:py-20 px-4 ">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="text-3xl font-bold text-center mb-6">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-base-content/70 text-lg md:text-xl">
            Got questions? We've got answers. Here's everything you need to know about booking with TicketBari.
          </p>
        </div>

        {/* Accordion FAQ */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-base-100 rounded-2xl border border-base-300 
                         shadow-md hover:shadow-lg transition-all duration-300"
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
              <div className="collapse-title text-xl font-bold text-base-content group-hover:text-primary">
                {item.question}
              </div>
              <div className="collapse-content text-base-content/80 text-base leading-relaxed">
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-base-content/70 text-lg mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="mailto:support@ticketbari.com"
            className="btn btn-primary btn-lg px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;