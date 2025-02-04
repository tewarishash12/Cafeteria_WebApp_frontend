import React, { useState } from 'react';
import CounterCard from '../component/CounterCard';
import { useSelector } from 'react-redux';
import CounterForm from '../component/CounterForm';
import Modal from '../component/Modal';

function CounterPage() {
    const counters = useSelector(state => state?.counter?.allCounters)
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Counters</h1>

            {counters?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border-l-4  border-blue-600 rounded-lg shadow-md bg-slate-200 flex items-center justify-center hover:shadow-xl hover:bg-slate-300"
                    >
                        <span className="text-2xl font-bold">Add Counter</span>
                    </button>
                    {counters?.map((counter) => (
                        <CounterCard key={counter?._id} counter={counter} />
                    ))}
                </div>
            )}
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CounterForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            }


            {counters?.length === 0 && (
                <p>No counters available.</p>
            )}
        </div>
    );
}

export default CounterPage;
