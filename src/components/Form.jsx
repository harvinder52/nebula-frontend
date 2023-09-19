import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";

function Form() {
  const formData = useSelector((state) => state.formReducer.value);
  const formActionURL = `https://docs.google.com/forms/d/${formData.Action}/formResponse`;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const initialFormData = {};
  formData.Fields.forEach((field) => {
    console.log(field.Widgets[0].ID);
    initialFormData[`entry.${field.Widgets[0].ID}`] = "";
  });

  console.log(initialFormData);
  const [formValues, setFormValues] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log("form values", formValues, formActionURL);
  };

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
  console.log(formValues["entry.1741648865"]);

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
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl text-gray-600 font-semibold text-center">
        {formData.Title}
      </h2>
      <p className="text-gray-600 text-center">{formData.Header}</p>

      {!formSubmitted ? (
        <form
          action={formActionURL}
          method="POST"
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 border rounded-lg shadow-lg"
        >
          {formData.Fields.map((field) => (
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
      )}
    </div>
  );
}

export default Form;
