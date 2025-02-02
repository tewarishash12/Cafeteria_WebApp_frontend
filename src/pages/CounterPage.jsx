import React, { useState } from 'react';
import CounterCard from '../component/CounterCard';
import { useSelector } from 'react-redux';
import CounterForm from '../component/CounterForm';
import Modal from '../component/Modal';

function CounterPage() {
    const counters = useSelector(state => state.counter.allCounters)
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Counters</h1>

            {counters.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {counters.map((counter) => (
                        <CounterCard key={counter._id} counter={counter} />
                    ))}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 flex items-center justify-center hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">Add Counter</span>
                    </button>
                </div>
            )}
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CounterForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            }


            {counters.length === 0 && (
                <p>No counters available.</p>
            )}
        </div>
    );
}

export default CounterPage;
