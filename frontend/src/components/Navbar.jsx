import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { IoMenu } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";


const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-600">
      <div className="flex gap-4 items-center">
        <img className="h-9" src={assets.logo} alt="" />
        <div className="flex flex-col items-center justify-center">
          <h1
            onClick={() => navigate("/")}
            className="cursor-pointer text-primary text-3xl font-mono font-bold"
            alt=""
          >
            GYMROCK
          </h1>
          <h1 className="text-gray-200  ">fitness studio</h1>
        </div>
      </div>

      <ul className="hidden md:flex items-start gap-5 font-medium text-gray-200">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/trainers">
          <li className="py-1">ALL TRAINERS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image}
              alt="profile pic"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-700 text-white rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-primary cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-primary cursor-pointer"
                >
                  My Appoinments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-primary cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-gray-700 px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        <IoMenu
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden text-white text-5xl"
        />
        {/* --------Mobile Menu------ */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-black text-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <div className="flex gap-4 items-center">
              <img className="h-9" src={assets.logo} alt="" />
              <div className="flex flex-col items-center justify-center">
                <h1
                  onClick={() => navigate("/")}
                  className="cursor-pointer text-primary text-3xl font-mono font-bold"
                  alt=""
                >
                  GYMROCK
                </h1>
                <h1 className="text-gray-200">fitness studio</h1>
              </div>
            </div>
            <RiCloseLargeFill onClick={() => setShowMenu(false)} className="text-3xl"/>
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px4 py2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/trainers">
              <p className="px4 py2 rounded inline-block">ALL TRAINERS</p>{" "}
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px4 py2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px4 py2 rounded inline-block">CONTACTS</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
