"use client";
import "tailwindcss/tailwind.css";
import React from "react";
import Link from "next/link";
import Home from "../components/Home.jsx";

import Form from "./Form";

function App() {
  return (
    <ul>
      <li>
        <Link href="/">
          <Home></Home>
        </Link>
      </li>
      <li>
        <Link href="/Form"></Link>
      </li>
    </ul>
  );
}
export default App;
