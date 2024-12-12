import Layout from "../layout/Layout";

const Courses = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Coming Soon!</h1>
        <p className="text-lg mb-8 text-gray-600">
          We're working hard to bring you the best courses.
        </p>
        <div className="animate-pulse rounded-full bg-gray-300 h-12 w-12"></div>
      </div>
    </Layout>
  );
};

export default Courses;
