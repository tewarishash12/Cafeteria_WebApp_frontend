import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import CounterPage from './pages/CounterPage'
import MenuPage from './pages/MenuPage'
import { LoginPage, RegisterPage } from './pages/AuthenticationPage'
import Navbar from './component/Navbar'
import ProfilePage from './pages/ProfilePage'
import { APIProvider } from "./context/APIProvider";

function layout(element) {
    return (
        <>
            <Navbar />
            {element}
        </>
    );
}

function App() {
    return (
        <APIProvider>
            <div className="bg-blue-50 min-h-screen text-gray-700">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={layout(<Homepage />)} />
                        <Route path="/cart" element={layout(<CartPage />)} />
                        <Route path="/counter" element={layout(<CounterPage />)} />
                        <Route path="/menu" element={layout(<MenuPage />)} />
                        <Route path="/auth/register" element={<RegisterPage />} />
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/users/me" element={layout(<ProfilePage />)} />
                    </Routes>
                </BrowserRouter>
            </div>
        </APIProvider>
    );
}

export default App;

