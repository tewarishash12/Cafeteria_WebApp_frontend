import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { FaShoppingBag } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { removeCurrentUser } from '../slices/authSlice';
import { emptyCart } from '../slices/cartSlice';

const Navbar = () => {
    const AUTH_LINK = import.meta.env.VITE_AUTH_API_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const length = useSelector(state => state?.cart?.items?.length || 0)
    const user = useSelector(state => state.auth.currentUser)
    console.log(user)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    async function handleLogout(){
        try {
            axios.post(`${AUTH_LINK}/auth/logout`, {token: localStorage.getItem('refreshToken')});
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            dispatch(removeCurrentUser());
            dispatch(emptyCart());
            navigate('/auth/login');
        } catch(err) {
            console.error(err.message)
        }
    }

    return (
        <nav className="overflow-hidden bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 w-full z-50">
            <div className="max-w-screen-xl">
                <div className="flex min-w-screen justify-between items-center h-16">
                    <div className="flex items-center ml-4">
                        <NavLink to="/" className="flex items-center space-x-2 ">
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                alt="Logo"
                                className="h-8"
                            />
                            <span className="text-2xl font-semibold text-gray-900 dark:text-white">FoodiDelicious</span>
                        </NavLink>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-6 pr-10">
                        <NavLink to="/" className="text-gray-900 dark:text-white hover:text-blue-600">Home</NavLink>
                        <NavLink to="/counter" className="text-gray-900 dark:text-white hover:text-blue-600">Counters</NavLink>
                        <NavLink to="/menu" className="text-gray-900 dark:text-white hover:text-blue-600">MenuPage</NavLink>
                        {localStorage.getItem("refreshToken") ?
                            <>
                                <NavLink to="/users/me" className="flex relative">
                                    {user?.username} Profile
                                </NavLink>
                                <button
                                onClick={handleLogout}
                                className="text-gray-900 dark:text-white hover:text-blue-600">
                                    Logout
                                </button>
                                <NavLink to="/cart" className="flex relative">
                                    <FaShoppingBag />
                                    <span className='text-sm text-orange-50 bg-amber-700 rounded-full w-5 h-5 px-1.5 font-bold absolute -top-4 left-2'>{length}</span>
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to="/auth/register" className="text-gray-900 dark:text-white hover:text-blue-600">Signup</NavLink>
                                <NavLink to="/auth/login" className="text-gray-900 dark:text-white hover:text-blue-600">Login</NavLink>
                            </>
                        }
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3 bg-gray-50 dark:bg-gray-800 flex flex-col">
                        <NavLink to="/" className="text-gray-900 dark:text-white hover:text-blue-600">Home</NavLink>
                        <NavLink to="/counter" className="text-gray-900 dark:text-white hover:text-blue-600">Counters</NavLink>
                        <NavLink to="/menu" className="text-gray-900 dark:text-white hover:text-blue-600">MenuPage</NavLink>
                        {localStorage.getItem("refreshToken") ?
                            <>
                                <NavLink to="/users/me" className="flex relative">
                                    {user?.username} Profile
                                </NavLink>
                                <button
                                onClick={handleLogout}
                                className="text-gray-900 dark:text-white hover:text-blue-600">
                                    Logout
                                </button>
                                <NavLink to="/cart" className="flex relative">
                                    Cart
                                    <span className='text-sm text-orange-50 bg-amber-700 rounded-full w-5 h-5 px-1.5 font-bold absolute -top-4 left-2'>{length}</span>
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink to="/auth/register" className="text-gray-900 dark:text-white hover:text-blue-600">Signup</NavLink>
                                <NavLink to="/auth/login" className="text-gray-900 dark:text-white hover:text-blue-600">Login</NavLink>
                            </>
                        }
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
