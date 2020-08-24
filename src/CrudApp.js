import React from "react";

import { FormScreen } from "./components/FormScreen";
import { ToastContainer } from "react-toastify";

import "bootswatch/dist/lux/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import './style.css'

export const CrudApp = () => {
  return (
    <div className="container">
      <ToastContainer />
      <FormScreen />
    </div>
  )
}
