import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
                    {counters.map((counter, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
                        >
                            <h2 className="text-lg font-semibold mb-2">{counter.shop_name}</h2>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                {counter.merchant_id.map((merchant, i) => (
                                    <div key={i}>
                                        <p><strong>Merchant Name:</strong> {merchant.username}</p>
                                        <p><strong>Phone:</strong> {merchant.phoneNo}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
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
