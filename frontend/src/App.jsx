import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import ProductDetailsPage from './pages/productDetailsPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactUs from './pages/contactUsPage.jsx';

function App() {


  return (
    <>
      <BrowserRouter>

      <Routes path = "/">

        <Route path = "/product/:id" element = {<ProductDetailsPage/>}/>
        <Route path = "/contactus" element = {< ContactUs/>}/>





      </Routes>
      
      </BrowserRouter>
      
    </>
  )
}

export default App
