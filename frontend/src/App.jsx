import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Trainers from "./pages/Trainers";
import Login from "./pages/Login";
import About from "./pages/About";
import MyProfile from "./pages/MyProfile";
import MyAppoinments from "./pages/MyAppoinments";
import Appoinments from "./pages/Appoinments";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "./assets/assets";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Loading from "./components/Loading";

const App = () => {


  return (
    <div className="mx-4 sm:mx-[10%] bg-black ">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <Loading/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainers/:category" element={<Trainers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppoinments />} />
        <Route path="/appoinment/:trainerId" element={<Appoinments />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
