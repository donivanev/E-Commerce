import './App.css'
import NavBar from './components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/screens/home'
import Signup from './components/screens/signup'
import Signin from './components/screens/signin'
import Profile from './components/screens/profile'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signin" element={<Signin />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;