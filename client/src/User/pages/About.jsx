import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const About = () => {
  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      image: "https://via.placeholder.com/150",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
    {
      name: "John Smith",
      role: "Lead Developer",
      image: "https://via.placeholder.com/150",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
    {
      name: "Alice Johnson",
      role: "Product Designer",
      image: "https://via.placeholder.com/150",
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Introduction */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-gray-600 mt-4">
            We are a passionate team dedicated to delivering the best solutions
            for our clients. Our journey started with a mission to transform
            ideas into impactful digital experiences.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            Our mission is to empower individuals and businesses through
            innovative technology, seamless design, and exceptional service. We
            believe in creating meaningful connections between brands and
            people, making a positive impact on the world.
          </p>
        </div>

        {/* Team Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800">
            Meet the Team
          </h2>
          <p className="text-gray-600 mt-2">
            Our talented team members who bring our vision to life.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
              <div className="flex justify-center mt-4 space-x-4 text-gray-600">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} className="hover:text-blue-700" />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={24} className="hover:text-blue-500" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={24} className="hover:text-gray-800" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
