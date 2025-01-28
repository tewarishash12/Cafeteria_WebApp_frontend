import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCompleteMenu } from '../slices/dishSlice';
import axios from 'axios';

function FoodForm({onClose}) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const counters = useSelector(state => state.counter.allCounters);
    const dispatch = useDispatch();

    const [dishName, setDishName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [availability, setAvailability] = useState(true)
    const [counterId, setCounterId] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${MAIN_LINK}/dish`, { dish_name: dishName, description: description, image: image, availability: availability, counter_id: counterId, price: price });
            dispatch(setCompleteMenu({ menu: res.data.dishes }));
            setDishName('');
            setDescription('');
            setImage('');
            setPrice('');
            setAvailability(true);
            setCounterId('');
            onClose();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 text-black">
            <div>
                <label className="block text-sm font-medium">Dish Name</label>
                <input
                    type="text"
                    name="dish_name"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Availability</label>
                <input
                    type="checkbox"
                    name="availability"
                    checked={availability}
                    onChange={(e) => setAvailability(e.target.checked)}
                    className="mr-2"
                />
                <span>Available</span>
            </div>
            <div>
                <label className="block text-sm font-medium">Counter</label>
                <select
                    name="counter_id"
                    value={counterId}
                    onChange={(e) => setCounterId(e.target.value)}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="" disabled>
                        Select Counter
                    </option>
                    {counters.map((counter) => (
                        <option key={counter._id} value={counter._id}>
                            {counter.shop_name}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Dish
            </button>
        </form>
    )
}

export default FoodForm