import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CounterCard from '../component/CounterCard';

function Counters() {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const [counters, setCounters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCounters() {
            try {
                const res = await axios.get(`${MAIN_LINK}/counter`);
                setCounters(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch counters');
                setLoading(false);
            }
        }
        fetchCounters();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Counters</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && counters.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {counters.map((counter) => (
                        <CounterCard key={counter._id} counter={counter} />
                    ))}
                </div>
            )}

            {!loading && !error && counters.length === 0 && (
                <p>No counters available.</p>
            )}
        </div>
    );
}

export default Counters;
