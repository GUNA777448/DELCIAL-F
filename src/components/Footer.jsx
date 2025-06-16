import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">Our Delicial</h2>
          <p className="text-sm mt-2 text-gray-300">
            Taste the tradition, love the flavor. Bringing deliciousness
            straight to your table since 2025.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/" className="hover:text-yellow-400">
                Home
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-yellow-400">
                Menu
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-400">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="/reservation" className="hover:text-yellow-400">
                Table Reservation
              </a>
            </li>
            <li>
              <a href="/menu" className="hover:text-yellow-400">
                Online Ordering
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-yellow-400">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="hover:text-yellow-400 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="hover:text-yellow-400 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="hover:text-yellow-400 transition" />
            </a>
            <a href="mailto:ourdelicial@example.com">
              <Mail className="hover:text-yellow-400 transition" />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Our Delicial. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
