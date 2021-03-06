import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import NavBar from './components/navbar'
import Home from './components/screens/home'
import Signup from './components/screens/signup'
import Signin from './components/screens/signin'
import Profile from './components/screens/profile'
import CreateProduct from './components/screens/createproduct' 
import EditProduct from './components/screens/editproduct'
import ProductItem from './components/screens/productitem'
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
    }
    else {
      navigate('/signin')
    }
  }, [])

  return (
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/profile/:userId' element={<Profile />}></Route>
        <Route path='/createproduct' element={<CreateProduct />}></Route>
        <Route path='/editproduct/:productId' element={<EditProduct />}></Route>
        <Route path='/productitem/:productId' element={<ProductItem />}></Route>
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