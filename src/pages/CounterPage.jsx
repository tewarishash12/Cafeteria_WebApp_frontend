import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CounterCard from '../component/CounterCard';
import { useSelector } from 'react-redux';

function CounterPage() {
    const counters = useSelector(state=>state.counter.allCounters)

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Counters</h1>

            {counters.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {counters.map((counter) => (
                        <CounterCard key={counter._id} counter={counter} />
                    ))}
                </div>
            )}

            {counters.length === 0 && (
                <p>No counters available.</p>
            )}
        </div>
    );
}

export default CounterPage;
