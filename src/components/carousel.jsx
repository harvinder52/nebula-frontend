import React, { useState } from "react";
import { useSelector } from "react-redux";

const Carousel = () => {
  const formData = useSelector((state) => state.formReducer.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const bgColor = [
    "red",
    "purple",
    "green",
    "yellow",
    "blue",
    "fuchsia",
    "lime",
    "black",
    "teal",
    "orange",
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % formData.Fields.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? formData.Fields.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        {formData.Fields.map((field, index) => (
          <div
            key={index}
            className={`w-full h-full absolute  flex justify-center flex-col items-center transition-transform duration-500 transform ${
              activeIndex === index ? "translate-x-0" : "translate-x-full"
            } bg-${bgColor[index]}-500`}
          >
            <div className="w-3/4">
              <span className="w-full flex text-5xl  m-5 justify-start">
                {field.Label}
              </span>
              <input
                type={field.TypeID === 0 ? "text" : "email"}
                name={`entry.${field.Widgets[0].ID}`}
                id={`inp${field.Widgets[0].ID}`}
                required={field.Widgets[0].required}
                placeholder={field.Label}
                className="w-full px-4  text-gray-500 py-4 text-blue rounded-lg border-none  border-gray-300 focus:outline-none focus:border-blue-500"
                //value={formValues[`entry.${field.Widgets[0].ID}`]}
                //onChange={handleInputChange}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={prevSlide}
        >
          Previous
        </button>
        <button className="bg-gray-700 font-mono text-white px-4 py-2 rounded-3xl ">
          <span className="text-gray-300 ">Powered by</span> NebulaForms
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={() => {
            nextSlide(), console.log(activeIndex, "slides");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
