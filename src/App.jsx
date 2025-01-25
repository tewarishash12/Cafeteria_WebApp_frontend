import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import Counters from './pages/Counters'
import MenuPage from './pages/MenuPage'
import { LoginPage, RegisterPage } from './pages/AuthenticationPage'

function App() {

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={ <Homepage/>} />
            <Route path="/cart" element={ <CartPage/>} />
            <Route path="/counter" element={ <Counters/>} />
            <Route path="/menu" element={ <MenuPage/>} />
            <Route path="/auth/register" element={ <RegisterPage/>} />
            <Route path="/auth/login" element={ <LoginPage/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
