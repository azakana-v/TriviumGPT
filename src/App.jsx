import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "regenerator-runtime/runtime";
import "boxicons";

import Home from "./pages/HomePage/Home";
import TriviumGPT from "./components/TriviumGPT/TriviumGPT";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/TriviumGPT" element={<TriviumGPT />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
