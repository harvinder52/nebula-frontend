import axios from "axios";

import { useEffect, useState } from "react";
import nebulaImage from "../assets/nebula.jpg";
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
    <div className="h-screen w-full flex flex-col ">
      <nav className="bg-black p-4 text-white">
        <div className="container mx-auto">
          <span className="text-xl font-bold">Nebula form</span>
        </div>
      </nav>
      <div
        style={{
          backgroundImage: `url(${nebulaImage})`,
          backgroundSize: "cover",
        }}
        className="flex-grow flex flex-col justify-center items-center bg-cover"
      >
        <h1 className="text-white md:text-5xl mb-16">
          Let us do the magic for you
        </h1>

        <form
          className="flex  w-full justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="w-2/3 px-4 py-2 rounded-l-lg hover:border-[#ff83ff] border text-white bg-gray-900 border-white"
            placeholder="Enter Google Form URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black border border-gray-300 text-white px-4 py-2 rounded-r-lg hover:bg-black-900"
          >
            Do Magic!
          </button>
        </form>
        {isLoading && <p className="text-white">Loading...</p>}
        {isError && <p className="text-white">Error: Unable to fetch data</p>}

        {/* Display the data when not loading and no error */}
        {!isLoading && !isError && (
          <div className="fade-in show">
            <Cards />
          </div>

          // <textarea mt-4 rows="10" cols="100">
          //   {JSON.stringify(data, undefined, 4)}
          // </textarea>
        )}
      </div>
    </div>
  );
}

export default HeroContainer;
