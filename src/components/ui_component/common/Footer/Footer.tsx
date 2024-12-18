import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Column 1: About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            Welcome to our e-commerce store! We offer a wide range of
            high-quality products at the best prices. Shop with confidence and
            enjoy fast delivery.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link href="" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@example.com</p>
          <p className="text-sm">Phone: +1 234 567 890</p>
          <p className="text-sm">Address: 123 Market St, Cityville, Country</p>
          <div className="mt-4 flex space-x-4">
            {/* Social Media Icons */}
            <Link href="3" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl"></FaFacebook>
            </Link>
            <Link href="3" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl"></FaInstagram>
            </Link>
            <Link href="3" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl"></FaLinkedin>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
