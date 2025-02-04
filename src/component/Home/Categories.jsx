import React from 'react'

function Categories() {
    const foodCategories = [
        { name: "pizza", icon: "https://media.istockphoto.com/id/1063755642/photo/small-mini-pizza-on-baking-paper-on-a-dark-wooden-background.jpg?s=612x612&w=0&k=20&c=KxTFGrzt4EcCyjHOTQJmPGIz-Afd6GaxPx8CMOzpDhE=" },
        { name: "pasta", icon: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/04/white-sauce-pasta-recipe.webp" },
        { name: "burger", icon: "https://thumbs.dreamstime.com/b/street-style-burger-small-patty-veggies-ai-generated-street-style-burger-small-patty-veggies-332535698.jpg" },
        { name: "icecream", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pPkXZ3d0Okd0tfHu0JMEFu00xvzdlGaPUw&s" },
        { name: "cake", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUJjnMKig5HnA4qBxwPyHkLzKowUwcXb5Z3A&s" },
    ]
    return (
        <div className="flex flex-col justify-center gap-6 p-6">
            <h1 className='text-3xl'>Categories</h1>
            <div className='flex'>
                {foodCategories.map((category, index) => (
                    <div key={index}
                        className="flex items-center flex-col space-x-4 justify-center text-3xl transition-all"
                    >
                        <img src={category.icon} alt={category.name} className='h-[10vh] w-[10vh] rounded-full cursor-pointer' />
                        <span className="mt-2 text-lg">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories