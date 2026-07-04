import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guard the entire application space under a protected layout route */}
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
