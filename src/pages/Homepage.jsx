import React from 'react'
import AutoCarousel from '../component/AutoCarousel'
import Categories from '../component/Categories'

function Homepage() {
    return (
        <div className='flex flex-col items-center'>
            <AutoCarousel />
            <Categories />
        </div>
    )
}

export default Homepage