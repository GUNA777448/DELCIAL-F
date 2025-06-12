import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Navbar";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const AnimatedInput = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
  }) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        required
        className="peer w-full border border-gray-300 rounded-md px-4 py-3 bg-transparent text-gray-700 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-300 transition"
      />
      <label
        htmlFor={name}
        className="absolute left-4 top-3 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-3 cursor-text peer-focus:-top-2 peer-focus:text-gray-700 peer-focus:text-sm transition-all"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-yellow-50 to-orange-100 py-16 px-4">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-3xl shadow-2xl overflow-hidden md:flex">
        {/* Contact Info Section */}
        <div className="w-full md:w-1/2 p-8 bg-red-600 text-white flex flex-col justify-center items-start relative">
          <h2 className="text-3xl font-extrabold mb-6 drop-shadow">
            Get in Touch
          </h2>
          <p className="text-lg mb-8">
            We'd love to hear from you! Whether you have questions, feedback, or
            just want to say hello, feel free to reach out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-xl text-yellow-300" />
              <span>123 Restaurant St, Foodie City</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-xl text-yellow-300" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-xl text-yellow-300" />
              <span>info@delicial.com</span>
            </div>
          </div>
          {/* Animated Background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 animate-pulse bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400"></div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Send us a Message
          </h2>
          {submitted ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Message Sent!
              </h3>
              <p className="text-gray-600">
                Thank you for contacting us. We'll get back to you shortly!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <AnimatedInput
                label="Name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
              <AnimatedInput
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
              />
              <AnimatedInput
                label="Subject"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
              />
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold shadow-lg hover:bg-red-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
