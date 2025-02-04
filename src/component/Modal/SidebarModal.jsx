import React from 'react'

function SidebarModal({children}) {
    return (
        <div className="fixed top-15 left-0 flex h-full">
            <div className="w-64 h-full bg-gray-800 text-white p-4">
                {children}
            </div>
        </div>
    )
}

export default SidebarModal