import React, { useEffect } from "react";
import { useState } from "react";
import nebula from "../assets/nebula.png";
import fetchData from "../api/api";

import { AiOutlineArrowRight } from "react-icons/ai";

import { useSelector } from "react-redux";

function Form() {
  const { id } = Object.fromEntries(new URLSearchParams(location.search));
  (async () => {
    await fetchData(id);
  })();

  const formData = useSelector((state) => state.formReducer.value);

  const formActionURL = `https://docs.google.com/forms/d/${formData.Action}/formResponse`;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const bgColor = [
    "red",
    "purple",
    "green",
    "teal",
    "blue",
    "lime",
    "lime",
    "pink",
    "teal",
    "orange",
  ];

  const initialFormData = {};
  formData.Fields.forEach((field) => {
    console.log(field.Widgets[0].ID);
    initialFormData[`entry.${field.Widgets[0].ID}`] = "";
  });

  const [formValues, setFormValues] = useState(initialFormData);
  const lastIndex = formData.Fields.length - 1;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const nextSlide = () => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prevIndex) =>
      prevIndex < lastIndex ? prevIndex + 1 : prevIndex
    );
  };
  const prevSlide = () => {
    setPrevActiveIndex(activeIndex);
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };
  useEffect(() => {
    console.log(prevActiveIndex);
  }, [prevActiveIndex]);

  function getInputData() {
    let dataToPost = new FormData(); //formdata API

    for (const key in formValues) {
      console.log(`"${key}"`, `"${formValues[key]}"`);

      dataToPost.append(key, formValues[key]);
    }
    // dataToPost.append("entry.1741648865", formValues["entry.1741648865"]);
    // dataToPost.append("entry.347094691", "harvinder");
    // dataToPost.append("entry.1979937581", "harvinder");
    // dataToPost.append("entry.534076170", "harvinder");
    // dataToPost.append("entry.544181557", "harvinder");
    console.log(dataToPost);

    return dataToPost;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;
      console.log(form);
      let submitFormData = new FormData();

      const response = await fetch(formActionURL, {
        method: "POST",
        body: getInputData(),

        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          console.log(data);
          alert("Form Submitted");
        })
        .catch((err) => console.error(err));

      if (response.ok) {
        console.log("Form submitted successfully");
        alert("Form Submitted");
        setFormSubmitted(true);
      } else {
        console.error("Form submission failed");
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  return (
    <div className=" mx-auto  bg-gray-600 rounded shadow">
      <div className="relative  h-screen overflow-hidden">
        <div>
          <form
            action={formActionURL}
            method="POST"
            onSubmit={handleSubmit}
            className="absolute inset-0 flex justify-center items-center"
          >
            {/* <img src={nebula}></img> */}
            {formData.Fields.map((field, index) => (
              <div
                key={index}
                className={`w-full h-full absolute shadow-2xl flex justify-center flex-col items-center transition-transform duration-500 transform ${
                  activeIndex === index ? "translate-x-0" : "translate-x-full"
                } bg-${bgColor[index]}-500`}
              >
                {/* top secret code */}
                <div
                  className={`w-3/4 content ${
                    activeIndex == index && activeIndex >= prevActiveIndex
                      ? "slide-in-bottom"
                      : activeIndex <= prevActiveIndex && activeIndex === index
                      ? "slide-in-top"
                      : ""
                  }`}
                >
                  {console.log(
                    activeIndex,
                    prevActiveIndex,
                    index,

                    activeIndex < index ? "slide-in-top" : "slide-in-bottom"
                  )}
                  <span className="w-full text-white  flex items-center text-5xl  m-5 justify-start">
                    <div
                      className="flex text-slate-300 text-2xl items-center mx-5"
                      style={{ marginLeft: "-5rem" }}
                    >
                      {index + 1}.
                      <AiOutlineArrowRight style={{ fontSize: "100%" }} />
                    </div>

                    {field.Label}
                  </span>
                  <input
                    type={field.TypeID === 0 ? "text" : "email"}
                    name={`entry.${field.Widgets[0].ID}`}
                    id={`inp${field.Widgets[0].ID}`}
                    required={field.Widgets[0].required}
                    placeholder={field.Label}
                    className="w-full px-4 transform  hover:scale-110
                    transition duration-500 text-gray-500 py-4 text-blue rounded-lg border-none text-2xl text-gray-700 border-gray-300 focus:outline-none focus:border-blue-500"
                    value={formValues[`entry.${field.Widgets[0].ID}`]}
                    onChange={handleInputChange}
                  />
                  {lastIndex === activeIndex ? (
                    <button
                      className="bg-white border text-black my-10 border-gray-300 text-white px-10 py-2 border  rounded-lg   hover:outline-slate-500"
                      onClick={console.log("first")}
                    >
                      Submit!
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </form>
        </div>
        <div className="absolute  bottom-0 left-0 right-0 flex  justify-end  p-12">
          <div
            disabled={true}
            className="  w-full fixed flex justify-start items-center  left-0 top-0  text-white bg-transparent  text-2xl font-sans tracking-tighter   p-4"
          >
            <span className="text-4xl border rotate-center rounded-full px-4 py-2 mr-1">
              N
            </span>
            Nebula Forms
          </div>
          <button
            className="bg-white mr-4  heartbeat  text-3xl text-slate-500 px-4 py-2 rounded-full"
            onClick={prevSlide}
            disabled={0 === activeIndex ? true : false}
          >
            <div className="rotate-180">{0 === activeIndex ? "☒" : "➜"}</div>
          </button>

          <button
            className="bg-white heartbeat text-3xl text-slate-500 px-4 py-2 rounded-full"
            onClick={nextSlide}
            disabled={lastIndex === activeIndex ? true : false}
          >
            {lastIndex === activeIndex ? "☑" : "➜"}
          </button>
        </div>
      </div>
      {/* <h2 className="text-2xl text-gray-600 font-semibold text-center">
        {formData.Title}
      </h2>
      <p className="text-gray-600 text-center">{formData.Header}</p>

      {!formSubmitted ? (
        <form
          action={formActionURL}
          method="POST"
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 "
        >
          {formData.Fields.map((field) => (
            <div className="max-w-md mx-auto p-4 border rounded-lg ">
              <label htmlFor={`inp${field.Widgets[0].ID}`}>{field.Label}</label>
              <input
                type={field.TypeID === 0 ? "text" : "email"}
                name={`entry.${field.Widgets[0].ID}`}
                id={`inp${field.Widgets[0].ID}`}
                required={field.Widgets[0].required}
                placeholder={field.Label}
                className="w-full px-4 text-white py-2 text-blue rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={formValues[`entry.${field.Widgets[0].ID}`]}
                onChange={handleInputChange}
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      ) : (
        <p className="text-center text-green-500 font-semibold">
          Form Submitted!
        </p>
      )} */}
    </div>
  );
}

export default Form;
