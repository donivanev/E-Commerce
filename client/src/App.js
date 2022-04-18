import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import NavBar from './components/navbar'
import Home from './components/screens/home'
import Signup from './components/screens/signup'
import Signin from './components/screens/signin'
import Profile from './components/screens/profile'
import CreateProduct from './components/screens/createproduct' 
import Footer from './components/footer'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signin" element={<Signin />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/createproduct" element={<CreateProduct />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;