import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import Layout from "../layout/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm font-medium">
                Message
              </label>
              <textarea
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Connect with us:
            </h3>
            <div className="flex justify-center space-x-4 text-blue-600">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} className="hover:text-blue-700" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} className="hover:text-blue-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} className="hover:text-pink-500" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} className="hover:text-blue-600" />
              </a>
              <a href="mailto:contact@yourwebsite.com">
                <FaEnvelope size={24} className="hover:text-gray-600" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
