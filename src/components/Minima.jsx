import React, { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    const url =
      "https://docs.google.com/forms/d/e/1FAIpQLSeXCjbS4WPB7qhJuAR8qbndcxR64usTC8mRLbx5YDYVac2ttA/formResponse"; // action url
    const form = document.querySelector("#form2"); // form element

    form.addEventListener("submit", (e) => {
      e.preventDefault(); // prevent default behavior

      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: getInputData(),
      })
        .then((data) => {
          console.log(data);
          alert("Form Submitted");
        })
        .catch((err) => console.error(err));
    });

    // populating input data
    function getInputData() {
      let dataToPost = new FormData(); // formdata API

      // fill name attributes to corresponding values
      dataToPost.append(
        "entry.1741648865",
        document.querySelector("#inp1").value
      );
      dataToPost.append(
        "entry.347094691",
        document.querySelector("#inp2").value
      );
      dataToPost.append(
        "entry.1979937581",
        document.querySelector("#inp3").value
      );
      dataToPost.append(
        "entry.534076170",
        document.querySelector("#inp4").value
      );
      dataToPost.append(
        "entry.544181557",
        document.querySelector("#inp5").value
      );
      console.log(dataToPost);
      return dataToPost;
    }
  }, []);

  return (
    <div className="md:mx-24 md:my-6 my-2 mx-2 grid pb-16 justify-center">
      <div className="py-8 px-16">
        <h2 className="text-2xl md:text-3xl font-semibold py-6"> Contact Us</h2>
        <p>
          {" "}
          We love questions and feedback - and we are always happy to help!
        </p>
        <p> Here are some ways to contact us.</p>
      </div>

      <div className="grid border-2">
        <form
          action="https://docs.google.com/forms/d/e/1FAIpQLSeXCjbS4WPB7qhJuAR8qbndcxR64usTC8mRLbx5YDYVac2ttA/formResponse"
          method="post"
          id="form2"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-6"
        >
          <input
            type="text"
            name="entry.1741648865"
            id="inp1"
            placeholder="First Name"
            className="bg-neutral-200 hover:bg-neutral-100 rounded-md h-12 w-80 text-center"
            required
          />
          <input
            type="text"
            name="entry.347094691"
            id="inp2"
            placeholder="Last Name"
            className="bg-neutral-200 hover:bg-neutral-100 rounded-md h-12 w-80 text-center"
            required
          />
          <input
            type="text"
            name="entry.1979937581"
            id="inp3"
            placeholder="Company"
            className="bg-neutral-200 hover:bg-neutral-100 rounded-md h-12 w-80 text-center"
            required
          />
          <input
            type="email"
            name="entry.534076170"
            id="inp4"
            placeholder="Email"
            className="bg-neutral-200 hover:bg-neutral-100 rounded-md h-12 w-80 text-center"
            required
          />
          <input
            type="text"
            name="entry.544181557"
            id="inp5"
            placeholder="What can we help you with?"
            className="col-span-2 bg-neutral-200 hover:bg-neutral-100 rounded-md h-36 max-w-full"
            required
          />
          <button
            type="submit"
            className="bg-violet-700 hover:bg-violet-500 text-white rounded-md h-12 w-80 md:w-48 col-span-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const Minima = () => {
  return (
    <div>
      <ContactUs />
    </div>
  );
};

export default Minima;
