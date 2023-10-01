import React from "react";
import cardsConfig from "./Cards/cardsConfig";
import { useNavigateSearch } from "../hooks/navigateHook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Cards() {
  const navigateSearch = useNavigateSearch();
  const formData = useSelector((state) => state.formReducer.value);
  console.log(formData);

  const formActionURL = formData.Action.replace("e/", "");

  const goToForm = () => navigateSearch("/form", { id: formActionURL });

  return (
    <div className="bg-transparent  flex flex-wrap p-5 w-full">
      {cardsConfig.map((card, index) => {
        return (
          <div
            key={index}
            className="card m-5 shadow-2xl  rounded-lg   shadow-white outline-red"
          >
            <div className="max-w-sm bg-slate-100 border group relative border-red rounded-lg shadow ">
              <a href="#">
                <img
                  className="rounded-t-lg  transform  hover:scale-110
                  transition duration-500 rounded-xs  transform scale-100 group-hover:scale-110 "
                  src={card.imageUrl}
                  alt=""
                />
              </a>
              <div className="p-5 ">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-500 ">
                    {card.title}
                  </h5>
                </a>

                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => goToForm()}
                >
                  Apply Now!
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cards;
