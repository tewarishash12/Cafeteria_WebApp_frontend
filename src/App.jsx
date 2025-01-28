import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import CounterPage from './pages/CounterPage'
import MenuPage from './pages/MenuPage'
import { LoginPage, RegisterPage } from './pages/AuthenticationPage'
import Navbar from './component/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './slices/authSlice'
import { setCart } from './slices/cartSlice'
import { setCompleteMenu } from './slices/dishSlice'
import { setCounters } from './slices/counterSlice'

function layout(element) {
  return (
    <>
      <Navbar />
      {element}
    </>)
}

function App() {
  const dispatch = useDispatch();
  const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

  useEffect(() => {
    async function me(token) {
      try {
        const res = await axios.get(`${MAIN_LINK}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(setCurrentUser({ userInfo: res.data }));
        dispatch(setCart({ cart: res.data.cart }))
      } catch (err) {
        console.error("User is not logged in into the website")
      }
    }
    me(localStorage.getItem('accessToken'));
  });

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const res = await axios.get(`${MAIN_LINK}/dish/alldishes`);
        dispatch(setCompleteMenu({menu:res.data.dishes}));
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchMenuItems();
  });

  useEffect(() => {
    async function fetchAllCounters() {
      try {
        const res = await axios.get(`${MAIN_LINK}/counter/`);
        dispatch(setCounters({counters:res.data.counters}));
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchAllCounters();
  });

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={layout(<Homepage />)} />
            <Route path="/cart" element={layout(<CartPage />)} />
            <Route path="/counter" element={layout(<CounterPage />)} />
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
