import Layout from "../layout/Layout";
import { useState, useEffect } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Blog Post 1",
      slug: "blog-post-1",
      description: "This is a short description of the first blog post.",
      banner_img: "https://via.placeholder.com/640x360",
    },
    {
      id: 2,
      title: "Blog Post 1",
      slug: "blog-post-1",
      description: "This is a short description of the first blog post.",
      banner_img: "https://via.placeholder.com/640x360",
    },

    {
      id: 3,
      title: "Blog Post 1",
      slug: "blog-post-1",
      description: "This is a short description of the first blog post.",
      banner_img: "https://via.placeholder.com/640x360",
    },
    {
      id: 4,
      title: "Blog Post 1",
      slug: "blog-post-1",
      description: "This is a short description of the first blog post.",
      banner_img: "https://via.placeholder.com/640x360",
    },
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-md rounded-lg p-6">
              <img
                src={blog.banner_img}
                alt={blog.title}
                className="w-full mb-4"
              />
              <h2 className="text-xl font-bold mb-2">
                <a href={`/blog/${blog.slug}`}>{blog.title}</a>
              </h2>
              <p className="text-gray-700 mb-4">{blog.description}</p>
              <a
                href={`/blog/${blog.slug}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
