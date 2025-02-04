import React from 'react'
import AutoCarousel from '../component/Home/AutoCarousel'
import Categories from '../component/Home/Categories'

function Homepage() {
    return (
        <div className='flex flex-col'>
            <div className='mx-auto my-4'>
                <AutoCarousel />
            </div>
            <Categories />
        </div>
    )
}

export default Homepage