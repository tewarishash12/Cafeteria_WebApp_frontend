import React from "react";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-lg"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-300 text-black rounded-full p-1 hover:bg-gray-400"
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
