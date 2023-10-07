import React, { useEffect } from "react";
import { useState } from "react";
import nebula from "../assets/nebula.png";
import fetchData from "../api/api";

import { AiOutlineArrowRight } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { clearFormData, setFormData } from "../features/formSlice";
import MultipleChoice from "./InputComponents/MultipleChoice";
import InputSelect from "./InputComponents/InputSelect";
import CheckBoxes from "./InputComponents/CheckBoxes";

function Form() {
  const initialFormData = {};

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState(initialFormData);
  const [isError, setIsError] = useState(false);
  const [urlFormData, setUrlFormData] = useState({});
  let formData = useSelector((state) => state.formReducer.value);
  const themeConfig = useSelector((state) => state.theme);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const { id } = Object.fromEntries(new URLSearchParams(location.search));

  // useEffect(() => {
  //   async function fetchDataAsync() {
  //     await fetchData(id);
  //   }

  //   fetchDataAsync();
  //   console.log("fetch useffect");
  // }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(formData).length === 0) {
      setIsError(false);
      console.log(Object.keys(formData).length);

      fetchData(id)
        .then((data) => {
          dispatch(setFormData(data));
          console.log("useEffect in fetchData", data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);

          console.error("Error fetching data:", error);
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, id]);
  useEffect(() => {
    console.log(prevActiveIndex);
  }, [prevActiveIndex]);

  console.log(Object.keys(formData).length, "length is what");

  const formActionURL = `https://docs.google.com/forms/d/${formData.Action}/formResponse`;

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

  if (Object.keys(formData).length !== 0) {
    console.log(formData, "object keys lenght");
    formData.Fields.forEach((field) => {
      console.log(field.Widgets[0].ID);
      initialFormData[`entry.${field.Widgets[0].ID}`] = "";
    });
  }

  const lastIndex = formData.Fields?.length - 1;

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

  function getInputData() {
    let dataToPost = new FormData(); //formdata API

    for (const key in formValues) {
      console.log(`"${key}"`, `"${formValues[key]}"`);

      dataToPost.append(key, formValues[key]);
    }

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
      <div className="relative  w-screen flex justify-center items-center h-screen overflow-hidden">
        <div>
          {isLoading ? (
            <div className="rotate-center-loading e h-16  w-16 border-8 border border-t-gray-500 rounded-full border-white "></div>
          ) : isError ? (
            <p className=" text-xl bg-white border text-black border-gray-300 rounded-lg hover:outline-slate-500 m-2 p-5 ">
              Unable to Fetch Data....
            </p>
          ) : (
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
                    activeIndex === index
                      ? "translate-x-0 "
                      : "translate-x-full "
                  } bg-${bgColor[index]}-500`}
                >
                  {/* top secret code */}
                  <div
                    className={`w-3/4 content ${
                      activeIndex == index && activeIndex >= prevActiveIndex
                        ? "slide-in-bottom"
                        : activeIndex <= prevActiveIndex &&
                          activeIndex === index
                        ? "slide-in-top"
                        : ""
                    }`}
                  >
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

                    <div>
                      {(() => {
                        switch (field.TypeID) {
                          case 0:
                            return (
                              <input
                                type={"text"}
                                name={`entry.${field.Widgets[0].ID}`}
                                id={`inp${field.Widgets[0].ID}`}
                                required={field.Widgets[0].required}
                                placeholder={field.Label}
                                className="w-full px-4 transform  hover:scale-110
                          transition duration-500 text-gray-500 py-4 text-blue rounded-lg border-none text-2xl text-gray-700 border-gray-300 focus:outline-none focus:border-blue-500"
                                value={
                                  formValues[`entry.${field.Widgets[0].ID}`]
                                }
                                onChange={handleInputChange}
                              />
                            );
                          case 1:
                            return (
                              <input
                                type={field.TypeID === 0 ? "text" : "email"}
                                name={`entry.${field.Widgets[0].ID}`}
                                id={`inp${field.Widgets[0].ID}`}
                                required={field.Widgets[0].required}
                                placeholder={field.Label}
                                className="w-full px-4 transform  hover:scale-110
                          transition duration-500 text-gray-500 py-4 text-blue rounded-lg border-none text-2xl text-gray-700 border-gray-300 focus:outline-none focus:border-blue-500"
                                value={
                                  formValues[`entry.${field.Widgets[0].ID}`]
                                }
                                onChange={handleInputChange}
                              />
                            );
                          case 2:
                            return (
                              <InputSelect options={field.Widgets[0].options} />
                            );
                          // Continue with cases for 3 to 10
                          case 3:
                            return <MultipleChoice />;
                          case 4:
                            return (
                              <CheckBoxes options={field.Widgets[0].options} />
                            );

                          case 10:
                            return <MultipleChoice />;
                          default:
                            return <MultipleChoice />;
                        }
                      })()}
                    </div>

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
          )}
        </div>
        <div className="absolute  bottom-0 left-0 right-0 flex  justify-end  p-12">
          <a href="/">
            <div
              disabled={true}
              href="/home"
              className="  w-full fixed flex justify-start items-center  left-0 top-0  text-white bg-transparent  text-2xl font-sans tracking-tighter   p-4"
            >
              <span className="text-4xl border rotate-center rounded-full px-4 py-2 mr-1">
                N
              </span>
              Nebula Forms
            </div>
          </a>
          <button
            className={themeConfig.prevSlideBtn}
            onClick={prevSlide}
            disabled={0 === activeIndex ? true : false}
            style={{ cursor: "pointer" }}
          >
            <div className="rotate-180">{0 === activeIndex ? "☒" : "➜"}</div>
          </button>

          <button
            className={themeConfig.nextSlideBtn}
            onClick={nextSlide}
            disabled={lastIndex === activeIndex ? true : false}
          >
            {lastIndex === activeIndex ? "☑" : "➜"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
