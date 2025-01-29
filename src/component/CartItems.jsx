import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import CartItem from './CartItem';

function CartItems({ items }) {

    return (
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
            {items.map(({ item, quantity }) => (
                <CartItem key={item._id} item={item} quantity={quantity} />
            ))}
        </div>
    )
}

export default CartItems