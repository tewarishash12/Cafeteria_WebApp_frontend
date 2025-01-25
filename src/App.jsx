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

function App() {
  const dispatch = useDispatch();
  const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL
  useEffect(()=>{
    async function me(token){
      try {
        const res = await axios.get(`${MAIN_LINK}/users/me`, {
          headers: { Authorization : `Bearer ${token}`}
        })
        dispatch(setCurrentUser({username: res.data.username}));
      } catch(err) {
        console.error("User is not logged in into the website")
      }
    }
    me(localStorage.getItem('accessToken'));
  })

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <BrowserRouter >
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/counter" element={<Counters />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
