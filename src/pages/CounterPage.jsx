import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CounterCard from '../component/CounterCard';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

function CounterPage() {
    const counters = useSelector(state => state.counter.allCounters)

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Counters</h1>

            {counters.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {counters.map((counter) => (
                        <CounterCard key={counter._id} counter={counter} />
                    ))}
                    <NavLink
                        to="/counter/create"
                        className="border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 flex items-center justify-center hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">Add Counter</span>
                    </NavLink>
                </div>
            )}


            {counters.length === 0 && (
                <p>No counters available.</p>
            )}
        </div>
    );
}

export default CounterPage;
