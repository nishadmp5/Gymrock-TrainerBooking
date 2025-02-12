import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10 text-white">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------Left Section------- */}
        <div className="flex flex-col gap-2">
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
          <p className="w-full md:w-2/3 text-gray-200 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/* ------Center Section------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-200">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ------Right Section------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-200">
            <li>+1-212-456-7890</li>
            <li>random@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* ------Copyright Text-------- */}
        <div>
          <div className="bg-gray-700 w-full h-0.5 " />
          <p className="py-5 text-sm text-center text-gray-200">
            Copyright © 2024 random - All Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
