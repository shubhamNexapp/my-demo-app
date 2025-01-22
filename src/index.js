import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios"
import { GetUserDetails } from './Helpers/utility';

const root = ReactDOM.createRoot(document.getElementById('root'));

Axios.interceptors.request.use(
  config => {
    var Objdata = GetUserDetails();
    if (Objdata != null) {
      config.headers['authorization'] = 'Bearer ' + Objdata.token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
Axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    if (error.response.status === 400) {
      // Logout();
      return Promise.reject(error)
    }
    // Logout()
    return Promise.reject(error)
  }
)


root.render(
  <>
    {/* <React.StrictMode> */}
    <App />
    <ToastContainer />
    {/* </React.StrictMode> */}
  </>
);

