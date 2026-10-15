import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import heroImg from "./assets/hero.png";
import Login from "./Login.jsx";
import Register from "./Register";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
