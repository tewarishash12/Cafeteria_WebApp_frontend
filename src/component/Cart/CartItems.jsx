import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import CartSkeleton from "./CartSkeleton";

function CartItems({ items }) {

    const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            if (items.item?.length > 0) {
                setLoading(false);
            } else {
                setTimeout(() => setLoading(false), 2000);
            }
        }, [items.item]);

    return (
        <div className="flex-1 p-4 rounded-lg shadow-lg">
            {loading
                ? [...Array(3)].map((_, index) => <CartSkeleton key={index} />) 
                : items.length > 0
                ? items.map(({ item, quantity }) => <CartItem key={item._id} item={item} quantity={quantity} />)
                : <p className="text-gray-500 text-center">Your cart is empty.</p>
            }
        </div>
    );
}

export default CartItems;
