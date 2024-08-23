import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddNews from "./components/news/AddNews";
import Navbar from "./components/layout/Navbar";
import NewsBoard from "./components/news/NewsBoard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDb from "./components/news/NewsDb";
import EditNews from "./components/news/EditNews";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./components/auth/AuthProvider";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NewsBoard />} />
          <Route path="/add-news" element={<AddNews />} />
          <Route path="/news-db" element={<NewsDb />} />
          <Route path="/edit-news/:newsId" element={<EditNews />} />

          <Route path="/admin" element={<Admin />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
