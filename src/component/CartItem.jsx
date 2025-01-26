import React from 'react'
import { useDispatch } from 'react-redux'
import { changeQuantity } from '../slices/cartSlice';

function CartItem({ items }) {
    const dispatch = useDispatch();


    async function updateQuantity(count, id){
        try{
            dispatch(changeQuantity({count:count, id:id}))
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow-lg">
            {items.map(({item, quantity}, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-700 py-4"
                >
                    <div className="flex-1 ml-4">
                        <h2 className="text-lg font-semibold">{item.dish_name}</h2>
                        <p className="text-sm text-gray-400">{item.description}</p>
                        <p className="text-sm text-gray-400">₹{item.price}</p>
                    </div>
                    <p className="ml-4 text-lg font-semibold">
                        ₹{item.price * quantity}
                    </p>
                    <div>
                        <button
                            onClick={()=>updateQuantity(-1, item._id)}>-</button>
                        <span>{quantity || 0}</span>
                        <button
                            onClick={()=>updateQuantity(1, item._id)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartItem