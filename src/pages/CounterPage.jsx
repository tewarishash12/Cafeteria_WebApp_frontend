import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CounterCard from '../component/Counter/CounterCard';
import CounterForm from '../component/Counter/CounterForm';
import Modal from '../component/Modal/Modal';
import CounterSkeleton from '../component/Counter/CounterSkeleton';

function CounterPage() {
    const counters = useSelector(state => state?.counter?.allCounters);
    const userRole = useSelector(state => state?.auth?.currentUser?.role);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (counters?.length > 0) {
            setLoading(false);
        } else {
            setTimeout(() => setLoading(false), 2000);
        }
    }, [counters]);

    return (
        <div className="p-4">
            <h1 className="text-3xl text-center font-bold mb-4">Counters</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userRole === "admin" && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border-l-4 border-blue-600 rounded-lg shadow-md bg-slate-200 flex items-center justify-center hover:shadow-xl hover:bg-slate-300"
                    >
                        <span className="text-2xl font-bold">Add Counter</span>
                    </button>
                )}

                {/* Show Skeleton Cards while loading */}
                {loading
                    ? [...Array(3)].map((_, index) => <CounterSkeleton key={index} />)
                    : counters?.map((counter) => (
                        <CounterCard key={counter?._id} counter={counter} />
                    ))
                }
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CounterForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}

            {!loading && counters?.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No counters available.</p>
            )}
        </div>
    );
}

export default CounterPage;
