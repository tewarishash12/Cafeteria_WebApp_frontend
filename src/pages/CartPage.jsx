import React from 'react'
import { useSelector } from 'react-redux'
import Subtotal from '../component/SubTotal';
import CartItem from '../component/CartItem';

function CartPage() {
  const items = useSelector(state=> state.cart.items || []);
  console.log(items)

  const calculateSubtotal = () => {
    return items.reduce((total, {item, quantity}) => total + item.price * quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <CartItem items={items} />
          <Subtotal subtotal={calculateSubtotal()} />
        </div>
      </div>
    </div>
  )
}

export default CartPage