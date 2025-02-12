import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-100">
        <p>
          ABOUT <span className="text-gray-300 font-medium">US</span>
        </p>

        <div className="my-10 flex flex-col md:flex-row  gap-12">
          <img
            className="w-full md:max-w-[360px]"
            src={assets.about_image}
            alt=""
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm  text-gray-200">
            <p>
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel voluptas eaque possimus doloremque. Reprehenderit itaque debitis aspernatur quisquam! Ea laborum accusamus reprehenderit, facilis perspiciatis corrupti ab laudantium consectetur quaerat earum!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error dignissimos voluptatibus placeat nisi odio quas impedit eligendi voluptatem, rem, eius at assumenda tenetur voluptatum quam ullam, adipisci quasi! Quidem, cumque!
            </p>
            <b className="text-gray-100">Our Vision</b>
            <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt id excepturi in soluta corporis officia, placeat ipsa ea laboriosam vero eos molestias laborum doloremque molestiae ipsum ducimus minus dolore est.
            </p>
          </div>
        </div>

        <div className="text-xl my-4">
          <p>
            WHY <span className="text-gray-200 font-semibold">CHOOSE US</span>{" "}
          </p>
        </div>

        <div className="flex flex-col md:flex-row mb-20">
          <div className="border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-gray-700 transition-all duration-300 text-gray-200 cursor-pointer">
            <b>Efficiency</b>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt id excepturi in soluta 
            </p>
          </div>

          <div className="border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-gray-700 transition-all duration-300 text-gray-200 cursor-pointer">
            <b>Convenience</b>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt id excepturi in soluta 
            </p>
          </div>

          <div className="border px-10 md:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-gray-700 transition-all duration-300 text-gray-200 cursor-pointer">
            <b>Personalization</b>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt id excepturi in soluta 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
