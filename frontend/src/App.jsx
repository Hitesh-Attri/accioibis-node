import { useState } from "react";
import "./App.css";
import Home from "./Screens/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster />
    </>
  );
}

export default App;
