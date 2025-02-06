import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true, 
    };

    const slides = [
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        "https://www.shutterstock.com/image-photo/background-food-dishes-european-cuisine-260nw-2490284951.jpg",
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg",
        "https://media.gettyimages.com/id/1438016630/photo/medium-overhead-shot-of-families-sharing-dinner-at-outdoor-restaurant.jpg?s=612x612&w=gi&k=20&c=xf2riYkf-miHooKcMR-RRKaYPdI9vNFo1xfKv0fLS_c=",
    ];

    return (
        <div className="relative w-[90vw] h-[60vh] overflow-hidden mt-2 rounded-lg">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full">
                        <img
                            src={slide}
                            alt={`Image ${index + 1}`}
                            className="w-full object-contain"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
