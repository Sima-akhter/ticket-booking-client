import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear status when user starts typing again
    if (status !== "idle") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name.trim()) {
      setStatus("error");
      setMessage("Please enter your name");
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setStatus("error");
      setMessage("Message should be at least 10 characters");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Here you would normally send to your backend
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) });

      // Simulated success (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");
      setMessage("Your message has been sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen py-16 lg:py-20 px-4 ">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            <span className="text-3xl font-bold text-center mb-6">
              Get in Touch
            </span>
          </h1>
          <p className="text-base-content/70 text-lg md:text-xl max-w-3xl mx-auto">
            Have questions about booking, payments, or our services? We're here to help 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left - Contact Info */}
          <div className="space-y-10">
            <div className="bg-base-100 rounded-2xl p-8 shadow-md border border-base-300">
              <h2 className="text-2xl font-bold mb-6 text-base-content">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl text-primary mt-1">📍</div>
                  <div>
                    <h3 className="font-semibold text-base-content">Our Office</h3>
                    <p className="text-base-content/70">
                      Level-4, 34, Awal Centre, Banani, Dhaka-1213
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl text-primary mt-1">📧</div>
                  <div>
                    <h3 className="font-semibold text-base-content">Email Us</h3>
                    <p className="text-base-content/70">
                      support@ticketbari.com
                      <br />
                      info@ticketbari.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-3xl text-primary mt-1">📞</div>
                  <div>
                    <h3 className="font-semibold text-base-content">Helpline</h3>
                    <p className="text-base-content/70">
                      01322-901105
                      <br />
                      01322-810874
                    </p>
                    <p className="text-sm text-base-content/60 mt-1">
                      (Sat - Thu, 10:00 AM - 7:00 PM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links / Social */}
            <div className="bg-base-100 rounded-2xl p-8 shadow-md border border-base-300">
              <h3 className="text-xl font-bold mb-4 text-base-content">Follow Us</h3>
              <div className="flex gap-6 text-3xl text-primary">
                <a href="https://www.facebook.com/saima.islam.301007" className="hover:text-primary-focus transition-colors">Facebook</a>
                <a href="https://www.linkedin.com/in/sima-akter-6b4b3b3a3/" className="hover:text-primary-focus transition-colors">Linkedin</a>
                <a href="https://github.com/Sima-akhter" className="hover:text-primary-focus transition-colors">Github</a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8 lg:p-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-base-content">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block mb-2 font-medium text-base-content">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium text-base-content">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="input input-bordered w-full focus:input-primary"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 font-medium text-base-content">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="How can we help you today?"
                  className="textarea textarea-bordered w-full focus:textarea-primary min-h-[120px]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className={`btn btn-primary w-full ${status === "loading" ? "loading" : ""}`}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="alert alert-success shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{message}</span>
                </div>
              )}

              {status === "error" && (
                <div className="alert alert-error shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;