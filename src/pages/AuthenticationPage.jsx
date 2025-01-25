import React, { useEffect } from "react";
import { NavLink } from "react-router";

export const RegisterPage = () => {
    
    useEffect(()=>{

    })

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="p-8 rounded-3xl shadow-lg w-full max-w-sm relative">
                <h1 className="text-white text-2xl font-semibold text-center mb-6">Sign Up</h1>
                <form className="space-y-4">
                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    {/* phoneNo */}
                    <div>
                        <input
                            type="text"
                            placeholder="Phone No"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-black text-blue-300 text-lg font-bold rounded-md shadow-lg hover:bg-gray-800"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
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
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black">
            <div className="p-8 rounded-3xl shadow-lg w-full max-w-sm relative">
                <h1 className="text-white text-2xl font-semibold text-center mb-6">Sign In</h1>
                <form className="space-y-4">
                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 text-gray-200 bg-transparent border rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-200"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-black text-blue-300 text-lg font-bold rounded-md shadow-lg hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
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