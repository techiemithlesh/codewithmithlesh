import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./User/pages/Home";
import NotesPage from "./User/pages/NotesPage";
import Contact from "./User/pages/Contact";
import About from "./User/pages/About";
import Courses from "./User/pages/Courses";
import Blogs from "./User/pages/Blogs";
import BlogDetails from "./User/pages/BlogDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
