import { FaTicketAlt, FaLock, FaCheckCircle, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Easy Booking",
      desc: "Book your tickets in just a few clicks with a smooth user experience.",
      icon: <FaTicketAlt />,
    },
    {
      title: "Secure Payment",
      desc: "Your payments are fully secure and protected.",
      icon: <FaLock />,
    },
    {
      title: "Trusted Vendors",
      desc: "We work only with verified and reliable transport vendors.",
      icon: <FaCheckCircle />,
    },
    {
      title: "24/7 Support",
      desc: "Our support team is always ready to help you anytime.",
      icon: <FaHeadset />,
    },
  ];

  return (
    <section className="my-16 bg-gray-50 py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us? ⭐</h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition text-center flex flex-col items-center"
          >
            <div className="text-5xl text-primary mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
