import React from 'react'
import Navbar from '../component/Navbar'
import AutoCarousel from '../component/AutoCarousel'
import Categories from '../component/Categories'

function Homepage() {
    return (
        <div className='flex flex-col items-center min-w-screen'>
            <Navbar />
            <AutoCarousel />
            <Categories />
        </div>
    )
}

export default Homepage