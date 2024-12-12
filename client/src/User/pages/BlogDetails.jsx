import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const dummyBlog = {
      id: 1,
      title: "Exploring Modern Web Development",
      slug: "exploring-modern-web-development",
      description:
        "Web development is an ever-evolving field. In this post, we delve into the latest trends, tools, and technologies that are shaping the future of the web.",
      banner_img: "https://via.placeholder.com/1280x720",
      content: `In recent years, web development has undergone a significant transformation. From the rise of JavaScript frameworks like React and Vue.js to the advent of serverless architecture, developers have a plethora of tools to choose from. Accessibility and performance remain at the forefront of development efforts, ensuring that the web is inclusive and fast for everyone.

Other trends like dark mode design, progressive web apps (PWAs), and the increasing importance of user experience (UX) are also worth noting. This blog post explores these trends in greater depth, providing insights into how you can leverage them in your projects.`,
    };

    setBlog(dummyBlog);
  }, [slug]);

  if (!blog) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-gray-600 text-lg animate-pulse">
            Loading blog details...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Main Blog Content */}
        <div className="md:w-2/3 bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={blog.banner_img}
            alt={blog.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-500 text-sm mb-8">
              Published on {new Date().toLocaleDateString()} by Author Name
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {blog.description}
            </p>
            <div className="prose prose-lg max-w-none text-gray-800">
              {blog.content.split("\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Related Blogs */}
        <div className="md:w-1/3">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Related Blogs
            </h2>
            <ul className="space-y-4">
              <li className="border-b pb-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Understanding Serverless Architecture
                </a>
              </li>
              <li className="border-b pb-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Top 10 JavaScript Frameworks in 2024
                </a>
              </li>
              <li className="border-b pb-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Why Accessibility Matters in Web Design
                </a>
              </li>
              <li className="pb-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  The Rise of Progressive Web Apps (PWAs)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetails;
