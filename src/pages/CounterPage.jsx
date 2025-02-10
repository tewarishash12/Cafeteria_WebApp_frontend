import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CounterCard from "../component/Counter/CounterCard";
import CounterForm from "../component/Counter/CounterForm";
import Modal from "../component/Modal/Modal";
import CounterSkeleton from "../component/Counter/CounterSkeleton";

function CounterPage() {
    const counters = useSelector((state) => state?.counter?.allCounters);
    const user = useSelector((state) => state?.auth?.currentUser);
    const userRole = user?.role;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showMyCounters, setShowMyCounters] = useState(false);

    const displayedCounters =
        userRole === "merchant" && showMyCounters
            ? counters.filter((counter) =>
                counter?.merchant_id?.some((merchant) => merchant?._id === user._id)
            )
            : counters;

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

            {userRole === "merchant" && (
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded-md shadow-md hover:bg-teal-800 ${!showMyCounters ? "bg-teal-600  text-slate-200" : "bg-gray-300"}`}
                        onClick={() => setShowMyCounters(false)}
                    >
                        All Counters
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md shadow-md hover:bg-teal-800 hover:text-slate-200 ${showMyCounters ? "bg-teal-600  text-slate-200" : "bg-gray-300"}`}
                        onClick={() => setShowMyCounters(true)}
                    >
                        My Counters
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {loading
                    ? [...Array(3)].map((_, index) => <CounterSkeleton key={index} />)
                    : (
                        <>
                            {userRole === "admin" && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="border-l-4 border-blue-600 rounded-lg shadow-md bg-slate-200 flex items-center justify-center hover:shadow-xl hover:bg-slate-300 p-4"
                                >
                                    <span className="text-2xl font-bold">Add Counter</span>
                                </button>
                            )}

                            {displayedCounters?.map((counter) => (
                                <CounterCard key={counter?._id} counter={counter} />
                            ))}
                        </>
                    )}
            </div>

            {/* Modal for Adding Counter */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CounterForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}

            {/* Message when no counters exist */}
            {!loading && displayedCounters?.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                    {showMyCounters ? "You have no counters assigned to you." : "No counters available."}
                </p>
            )}
        </div>
    );
}

export default CounterPage;
