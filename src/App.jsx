// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import WorkoutPage from "./Components/WorkoutPage";
import Nav from "./Components/Nav";

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout/:id" element={<WorkoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
