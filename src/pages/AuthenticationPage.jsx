import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { setCurrentUser } from "../slices/authSlice";

const AUTH_LINK = import.meta.env.VITE_AUTH_API_URL;
export const RegisterPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegistration(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${AUTH_LINK}/auth/register`, { username, email, phoneNo, password }, {
                headers: { "Content-Type": "application/json" }
            });
            navigate("/auth/login");
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="p-8 rounded-3xl shadow-lg w-full max-w-sm relative">
                <h1 className="text-white text-2xl font-semibold text-center mb-6">Sign Up</h1>
                <form className="space-y-4" onSubmit={handleRegistration}>
                    <div>
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    <div>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    <div>
                        <input
                            value={phoneNo}
                            onChange={e => setPhoneNo(e.target.value)}
                            type="text"
                            placeholder="Phone No"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    <div>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-black text-blue-300 text-lg font-bold rounded-md shadow-lg hover:bg-gray-800"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-white mt-4">
                    Already have an account?{" "}
                    <NavLink to="/auth/login" className="underline hover:text-blue-100">
                        Log in here
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${AUTH_LINK}/auth/login`, {username,password});
            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            dispatch(setCurrentUser({user: res.data.user}))
            console.log(res.data)
            navigate("/");
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="p-8 rounded-3xl shadow-lg w-full max-w-sm relative">
                <h1 className="text-white text-2xl font-semibold text-center mb-6">Sign In</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    <div>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-black text-blue-300 text-lg font-bold rounded-md shadow-lg hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-white mt-4">
                    Don't have an account?{" "}
                    <NavLink to="/auth/register" className="underline hover:text-blue-100">
                        Register here
                    </NavLink>
                </p>
            </div>
        </div>
    );
};