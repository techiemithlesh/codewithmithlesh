import Footer from "./Footer";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

const Layout = ({
  children,
  title = "Codewithmithlesh - Home",
  description = "A freelancer web developer having expertise in Laravel Mern stack",
  keywords = "Web development, Freelancer, PHP LARAVEL MERN NODEJS EXPRESS JS",
  author = "Mithlesh Patel",
}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />

      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps;

export default Layout;
