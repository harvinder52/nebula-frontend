import React from "react";
import { useSelector } from "react-redux";
import Minima from "./Minima";

export const About = () => {
  console.log(useSelector((state) => state.formReducer.value));
  return (
    <div>
      <Minima />
    </div>
  );
};
