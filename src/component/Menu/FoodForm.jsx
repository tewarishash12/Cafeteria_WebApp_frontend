import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCompleteMenu } from '../../slices/dishSlice';
import axios from 'axios';

function FoodForm({ onClose, itemData = null }) {
    const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;
    const counters = useSelector(state => state.counter.allCounters);
    const dispatch = useDispatch();
    const [dishName, setDishName] = useState(itemData?.dish_name || '')
    const [description, setDescription] = useState(itemData?.description || '')
    const [image, setImage] = useState(itemData?.image || '')
    const [price, setPrice] = useState(itemData?.price || '')
    const [availability, setAvailability] = useState(itemData?.availability && true)
    const [counterId, setCounterId] = useState(itemData?.counter_id._id || '')

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let res;
            if (!itemData) {
                res = await axios.post(`${MAIN_LINK}/dish`, { dish_name: dishName, description: description, image: image, availability: availability, counter_id: counterId, price: price });
            } else {
                res = await axios.put(`${MAIN_LINK}/dish/id/${itemData._id}`, { dish_name: dishName, description: description, price: price, availability: availability, image: image })
                console.log(res?.data?.dishes)
            }
            dispatch(setCompleteMenu({ menu: res.data.dishes }));
        } catch (err) {
            console.error(err.message);
        } finally {
            onClose();
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 text-black">
            <div>
                <label className="block text-sm font-medium">
                    {itemData ? "Edit Dish Data" : "Enter new Dish data"}
                </label>
                <input
                    type="text"
                    name="dish_name"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    required
                    className="w-full p-2 border border-blue-900 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-blue-900 rounded"
                ></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                    type="text"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-2 border border-blue-900 rounded"
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
                    className="w-full p-2 border border-blue-900 rounded"
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
                {!itemData ? (
                    <select
                        name="counter_id"
                        value={counterId}
                        onChange={(e) => setCounterId(e.target.value)}
                        required
                        className="w-full p-2 border border-blue-900 rounded"
                    >
                        <option value="" selected hidden>
                            Select Counter
                        </option>
                        {counters.map((counter) => (
                            <option key={counter._id} value={counter._id}>
                                {counter.shop_name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p className="p-2 border rounded bg-gray-100">{itemData.counter_id?.shop_name}</p>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {itemData ? "Save changes" : "Add Dish"}
            </button>
        </form>
    )
}

export default FoodForm