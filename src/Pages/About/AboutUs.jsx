const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-6">About Us</h2>

        <p className="text-center text-gray-600 mb-10">
          Learn more about our mission, vision, and the values that drive us.
        </p>

        {/* Section 1 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">Who We Are</h3>
          <p className="text-gray-700 leading-relaxed">
            We are a modern online ticket booking platform dedicated to making
            travel and event booking easy, fast, and secure. Our system connects
            users with trusted vendors to provide reliable and affordable
            ticketing services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to simplify the ticket booking experience by offering
            a user-friendly platform with secure payments, real-time booking
            updates, and transparent pricing for everyone.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            We envision becoming a trusted digital ticketing solution that
            empowers users and vendors while setting new standards in
            reliability, efficiency, and customer satisfaction.
          </p>
        </div>

        {/* Values */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-5">Our Core Values</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="p-4 border rounded-lg shadow-sm">
              ✅ Customer First
            </li>
            <li className="p-4 border rounded-lg shadow-sm">
              🔐 Security & Trust
            </li>
            <li className="p-4 border rounded-lg shadow-sm">
              ⚡ Fast & Reliable Service
            </li>
            <li className="p-4 border rounded-lg shadow-sm">
              🌍 Innovation & Growth
            </li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have questions or want to work with us?
          </p>
          <a href="/contact" className="btn bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-full shadow-xl hover:shadow-purple-500 transform hover:scale-105 transition-all duration-300">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
