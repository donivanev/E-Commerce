import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { BrowserRouter, Routes, Route, Switch, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import NavBar from './components/navbar'
import Home from './components/screens/home'
import Signup from './components/screens/signup'
import Signin from './components/screens/signin'
import Profile from './components/screens/profile'
import CreateProduct from './components/screens/createproduct' 
import Footer from './components/footer'
import { reducer, initialState } from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
  
  const navigate = useNavigate()

  const {state, dispatch} = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({type: 'USER', payload: user })
      navigate('/')
    }
    else {
      navigate('/signin')
    }
  }, [])

  return (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signin" element={<Signin />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/createproduct" element={<CreateProduct />}></Route>
        <Route exact path="/signout" element={<Home />}></Route>
      </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Header />
        <NavBar />
        <Routing />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;