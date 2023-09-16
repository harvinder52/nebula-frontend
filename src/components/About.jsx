import React from "react";
import { useSelector } from "react-redux";

export const About = () => {
  console.log(useSelector((state) => state.formReducer.value));
  return <div>About</div>;
};
