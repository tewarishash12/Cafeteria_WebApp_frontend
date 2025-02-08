import React, { createContext, useContext, useEffect } from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser, removeCurrentUser } from "../slices/authSlice";
import { setCart } from "../slices/cartSlice";
import { setCompleteMenu } from "../slices/dishSlice";
import { setCounters } from "../slices/counterSlice";
import { allUsersList } from "../slices/userSlice";

const APIContext = createContext();

export function useAPICall() {
    return useContext(APIContext);
}

export function APIProvider({children}) {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

    async function fetchUser() {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("No token found");

            const res = await axios.get(`${MAIN_LINK}/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            dispatch(setCurrentUser({ user: res.data.user }));
            dispatch(setCart({ cart: res.data.user.cart }));
        } catch (err) {
            dispatch(removeCurrentUser());
            console.error("User is not logged in into the website");
        }
    }

    async function fetchMenuItems() {
        try {
            const res = await axios.get(`${MAIN_LINK}/dish/alldishes`);
            dispatch(setCompleteMenu({ menu: res.data.dishes }));
        } catch (err) {
            console.error(err.message);
        }
    }

    async function fetchAllCounters() {
        try {
            const res = await axios.get(`${MAIN_LINK}/counter/`);
            dispatch(setCounters({ counters: res.data.counters }));
        } catch (err) {
            console.error(err.message);
        }
    }

    async function fetchAllUsers() {
        try {
            const res = await axios.get(`${MAIN_LINK}/users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            const users = res?.data?.users;
            const customers = users.filter((user) => user.role === "customer");
            const merchants = users.filter((user) => user.role === "merchant");
            dispatch(allUsersList({ customers, merchants }));
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        async function fetchData(){
            try {
                await fetchUser();
                await fetchMenuItems();
                await fetchAllCounters();
                await fetchAllUsers();
            } catch (err) {
                console.error("Error fetching initial data", err);
                setError(err.message);
            }
        }
        fetchData();
    }, [])

    return (
        <APIContext.Provider>
            {children}
        </APIContext.Provider>
    )
}