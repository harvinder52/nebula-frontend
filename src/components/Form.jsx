import React from "react";
import { useState } from "react";

import { useSelector } from "react-redux";
const formData22 = {
  Title: "Contact Information",
  Header: "Contact information",
  Desc: "",
  Path: "/forms",
  Action: "e/1FAIpQLSdMcf4ie0pBmM4gG77dtgw2mNjUB6q_lxaXlfKEuYlLgi5EDA",
  Fbzx: "665421586129700482",
  SectionCount: 1,
  AskEmail: false,
  Fields: [
    {
      ID: 1633920210,
      Label: "Name",
      Desc: "",
      TypeID: 0,
      Widgets: [
        {
          ID: "2005620554",
          required: true,
        },
      ],
    },
    {
      ID: 227649005,
      Label: "Email",
      Desc: "",
      TypeID: 0,
      Widgets: [
        {
          ID: "1045781291",
          required: true,
        },
      ],
    },
    {
      ID: 790080973,
      Label: "Address",
      Desc: "",
      TypeID: 1,
      Widgets: [
        {
          ID: "1065046570",
          required: true,
        },
      ],
    },
    {
      ID: 1770822543,
      Label: "Phone number",
      Desc: "",
      TypeID: 0,
      Widgets: [
        {
          ID: "1166974658",
          required: false,
        },
      ],
    },
    {
      ID: 1846923513,
      Label: "Comments",
      Desc: "",
      TypeID: 1,
      Widgets: [
        {
          ID: "839337160",
          required: false,
        },
      ],
    },
  ],
};

function Form() {
  const formData = useSelector((state) => state.formReducer.value);
  const formActionURL = `https://docs.google.com/forms/d/${formData.Action}/formResponse`;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const initialFormData = {};
  formData.Fields.forEach((field) => {
    initialFormData[`entry.${field.ID}`] = "";
  });

  console.log(initialFormData);
  const [formValues, setFormValues] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    console.log("formbalues", formValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = e.target;
      console.log(form);
      let submitFormData = new FormData(form);
      for (const key in formValues) {
        console.log(key, formValues[key]);
        submitFormData.append(key, formValues[key]);
        console.log("submmitted", submitFormData);
      }

      console.log("submmitted", submitFormData);

      const response = await fetch(formActionURL, {
        method: "POST",
        body: submitFormData,

        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 border rounded-lg shadow-lg"
        >
          {formData.Fields.map((field) => (
            <div key={field.ID} className="mb-4">
              <label
                htmlFor={`inp${field.ID}`}
                className="block text-gray-600 text-sm font-semibold mb-1"
              >
                {field.Label}
              </label>
              <input
                type={field.TypeID === 0 ? "text" : "email"}
                name={`entry.${field.ID}`}
                id={`inp${field.ID}`}
                required={field.Widgets[0].required}
                placeholder={field.Label}
                className="w-full px-4 text-white py-2 text-blue rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={formValues[`entry.${field.ID}`]}
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
      )}
    </div>
  );
}

export default Form;
