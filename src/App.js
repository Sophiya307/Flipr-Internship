import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailPage from "./Pages/DetailPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailpage/:year/:category" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
