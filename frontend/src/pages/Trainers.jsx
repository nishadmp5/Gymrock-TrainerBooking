import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Trainers = () => {
  const { category } = useParams();
  const [filterTrainer, setFilterTrainer] = useState([]);
  const [showFilter,setShowFilter] = useState(false)

  const navigate = useNavigate();

  const { trainers } = useContext(AppContext);

  const applyFilter = () => {
    if (category) {
      setFilterTrainer(trainers.filter((trainer) => trainer.category === category));
    } else {
      setFilterTrainer(trainers);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [trainers, category]);

  return (
    <div>
      <p className="text-gray-200 ">Browse through the trainers category.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all text-white sm:hidden ${showFilter ? 'bg-primary text-gray-700' : '' }`} onClick={()=>{setShowFilter(prev => !prev); if(!category){navigate('/trainers')}}}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-200 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> category === 'General Fitness' ? navigate('/trainers') : navigate('/trainers/General Fitness')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${category === "General Fitness" ? "bg-primary text-black" : ""}`}>General Fitness</p>
          <p onClick={()=> category === 'Weight Loss' ? navigate('/trainers') : navigate('/trainers/Weight Loss')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${category === "Weight Loss" ? "bg-primary text-black" : ""}`}>Weight Loss</p>
          <p onClick={()=> category === 'Strength and Conditioning' ? navigate('/trainers') : navigate('/trainers/Strength and Conditioning')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${category === "Strength and Conditioning" ? "bg-primary text-black" : ""}`}>Strength and Conditioning</p>
          <p onClick={()=> category === 'Bodybuilding' ? navigate('/trainers') : navigate('/trainers/Bodybuilding')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${category === "Bodybuilding" ? "bg-primary text-black" : ""}`}>Bodybuilding</p>
          <p onClick={()=> category === 'Sports Specific' ? navigate('/trainers') : navigate('/trainers/Sports Specific')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${category === "Sports Specific" ? "bg-primary text-black" : ""}`}>Sports Specific</p>
          <p onClick={()=> category === 'Yoga and Pilates' ? navigate('/trainers') : navigate('/trainers/Yoga and Pilates')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${category === "Yoga and Pilates" ? "bg-primary text-black" : ""}`}>Yoga and Pilates</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterTrainer.map((item, index) => (
            <div
              onClick={() => navigate(`/appoinment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-blue-400' : 'text-gray-500'} `}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-blue-400' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                <p className="text-gray-300 text-lg font-medium">{item.name}</p>
                <p className="text-gray-400 text-sm">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;


