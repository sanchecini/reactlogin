import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import Login from "./admin/Login.js"
import Home from "./admin/Home.js"
import Register from "./admin/Register.js"
//dashboard 


ReactDOM.render(
  <BrowserRouter>
   <Routes>
      
      <Route path="/login" element={<Login />} />\
      <Route path="/index" element={<Home />} />
      <Route path="/register" element={<Register />} />
     
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
