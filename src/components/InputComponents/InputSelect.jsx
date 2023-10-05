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
          type="radio"
          checked={selected}
          onChange={onChange}
          className="form-radio h-5 w-5 text-gray-500 m-2 border border-gray-300 focus:ring-gray-500"
        />
        <span className=" text-slate-700 text-3xl">{text}</span>
      </label>
    </li>
  );
}

const InputSelect = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  return (
    <div>
      <ul className="max-w mx-auto   p-4 rounded ">
        {props.options.map((item, index) => (
          <ListItem
            key={index}
            text={item.label}
            selected={index === selectedOption}
            onChange={() => handleOptionChange(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default InputSelect;
