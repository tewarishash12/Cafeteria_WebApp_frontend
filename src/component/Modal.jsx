import React from "react";
import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50`}
        >
            <button
                onClick={onClose}
                className={`hover:text-gray-700 dark:hover:text-gray-300 absolute top-20 right-10`}
            >
                <FaTimes />
            </button>

            <div
                className={`bg-white p-6 rounded-lg shadow-lg min-w-[800px] max-h-[80vh] max-w-md m-auto overflow-auto`}>
                {children}
            </div >
        </div >

    );
}

export default Modal;
