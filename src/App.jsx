import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LandingPage, Login, Application } from "./pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Application />} />
      </Routes>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
