import React from 'react'
import { useDispatch } from 'react-redux';
import { changeQuantity, removeItem } from '../slices/cartSlice';
import axios from 'axios';

function CartItem({item, quantity}) {
    const dispatch = useDispatch();
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL

    async function updateQuantity(count, id) {
        try {
            dispatch(changeQuantity({ count: count, id: id }))
            await axios.patch(`${MAIN_LINK}/cart/updatecart`, {dish_id:id, count:count },{
                headers: {Authorization : `Bearer ${localStorage.getItem('accessToken')}`}
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteItem(id) {
        try {
            dispatch(removeItem({id:id}))
            await axios.patch(`${MAIN_LINK}/cart/removefromcart`,{dish_id: id}, {
                headers : {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
            })
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div
            key={item._id}
            className="flex items-center justify-between border-b border-gray-700 py-4"
        >
            <img
                src={item?.image} 
                alt={item?.dish_name} 
                className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-white">{item?.dish_name}</h2>
                <p className="text-sm text-gray-400">{item?.description}</p>
                <p className="text-sm text-gray-400">₹{item?.price}</p>
            </div>
            <p className="ml-4 text-lg font-semibold text-white">
                ₹{(item?.price || 0) * quantity}
            </p>
            <div className="flex items-center">
                <button
                    onClick={() => updateQuantity(-1, item._id)}
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    -
                </button>
                <span className="mx-2 text-white">{quantity || 0}</span>
                <button
                    onClick={() => updateQuantity(1, item._id)}
                    className="px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    +
                </button>
            </div>
            <div>
                <button
                    onClick={() => deleteItem(item._id)}
                    className="px-4 py-2 ml-4 text-sm bg-gray-600 text-white rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default CartItem