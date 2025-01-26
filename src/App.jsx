import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import Counters from './pages/Counters'
import MenuPage from './pages/MenuPage'
import { LoginPage, RegisterPage } from './pages/AuthenticationPage'
import Navbar from './component/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './slices/authSlice'
import { setCart } from './slices/cartSlice'

function layout(element) {
  return (
    <>
      <Navbar />
      {element}
    </>)
}

function App() {
  const dispatch = useDispatch();
  const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL
  useEffect(() => {
    async function me(token) {
      try {
        const res = await axios.get(`${MAIN_LINK}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(setCurrentUser({ userInfo: res.data }));
        dispatch(setCart({cart: res.data.cart}))
      } catch (err) {
        console.error("User is not logged in into the website")
      }
    }
    me(localStorage.getItem('accessToken'));
  })

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={layout(<Homepage />)} />
            <Route path="/cart" element={layout(<CartPage />)} />
            <Route path="/counter" element={layout(<Counters />)} />
            <Route path="/menu" element={layout(<MenuPage />)} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
