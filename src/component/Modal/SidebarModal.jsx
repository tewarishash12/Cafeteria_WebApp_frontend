import React from 'react'

function SidebarModal({children}) {
    return (
        <div className="fixed top-15 left-0 flex h-full border-r-2 border-blue-400">
            <div className="w-64 h-full p-4">
                {children}
            </div>
        </div>
    )
}

export default SidebarModal