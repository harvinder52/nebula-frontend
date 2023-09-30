import axios from "axios";

import { useEffect, useState } from "react";

import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../features/formSlice";

function HeroContainer() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(
    "https://docs.google.com/forms/d/e/1FAIpQLSdMcf4ie0pBmM4gG77dtgw2mNjUB6q_lxaXlfKEuYlLgi5EDA/viewform"
  );

  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading as false
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  async function fetchData() {
    setIsLoading(true); // Set isLoading to true while the request is in progress
    setIsError(false); // Reset isError to false
    try {
      const response = await axios.get(`http://127.0.0.1:8000/?url=${url}`);
      const result = response.data;
      console.log(result);
      setData(result);
      dispatch(setFormData(result));
    } catch (error) {
      setIsError(true); // Set isError to true if an error occurs
      console.error("API request error:", error);
    } finally {
      setIsLoading(false); // Set isLoading back to false when the request is completed
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="h-screen  smooth w-full flex flex-col ">
      <nav className="m-0 text-3xl py-2 px-8 relative font-extrabold font-mono text-center bg-white border border-gray-300 rounded-lg shadow-lg tracking-widest">
        <div className="container mx-auto">
          <span className="text-xl font-bold">PROJECT NEBULA</span>
        </div>
      </nav>
      <div
        //add image here for home's background
        // style={{
        //   backgroundImage: `url(${nebulaImage})`,
        //   backgroundSize: "cover",
        // }}
        className="flex-grow heroDiv h-auto  bg-white flex flex-col flex-wrap justify-center items-center bg-cover"
      >
        <h1 className="text-white text-focus-in md:text-5xl mb-16">
          Let us do the magic for you
        </h1>

        <form
          className="flex  w-full justify-center  transform  hover:scale-110
          transition duration-500 items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex w-2/3 shadow-2xl  shadow-slate-400 ">
            <input
              type="text"
              className="w-full px-4  text-gray-500 py-2 text-blue rounded-l-lg  border-none text-xl text-gray-700 border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter Google Form URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white border text-black border-gray-300 text-white px-10 py-2 border  rounded-r-lg   hover:outline-slate-500"
            >
              Do Magic!!
            </button>
          </div>
        </form>
        {isLoading && <p className="text-white">Loading...</p>}
        {isError && <p className="text-white">Error: Unable to fetch data</p>}

        {/* Display the data when not loading and no error */}
        {!isLoading && !isError && (
          <div className="fade-in show ">
            <Cards />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroContainer;
