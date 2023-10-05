import React, { useState } from "react";

function ListItem({ text, selected, onChange }) {
  return (
    <li
      className="flex items-center space-x-2 mb-2 cursor-pointer bg-white  text-3xl  px-4 py-2 rounded-full
       
     "
      onClick={onChange}
    >
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={onChange}
          className="form-checkbox mr-2 h-5 w-5 text-indigo-600 border border-gray-300 focus:ring-indigo-400"
        />
        <span className="  text-3xl m-2">{text}</span>
      </label>
    </li>
  );
}

const CheckBoxes = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (index) => {
    const selectedIndex = selectedOptions.indexOf(index);
    if (selectedIndex === -1) {
      // If the option is not selected, add it to the array
      setSelectedOptions([...selectedOptions, index]);
    } else {
      // If the option is already selected, remove it from the array
      const updatedSelection = [...selectedOptions];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedOptions(updatedSelection);
    }
  };

  return (
    <div>
      <ul className="max-w mx-auto  p-4 rounded ">
        {props.options.map((item, index) => (
          <ListItem
            key={index}
            text={item.label}
            selected={selectedOptions.includes(index)}
            onChange={() => handleOptionChange(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default CheckBoxes;
