import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Use 1 slide to work with fade effect
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true, 
    };

    const slides = [
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTuci7GSyrDVSHSR8XSUuxv6quu2c1bwd1Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEMuYNhe_lYba1wLikBS0n34LRwU3GuDH0Gw&s",
    ];

    return (
        <div className="relative w-[80vw] h-[80vh] overflow-hidden mt-2 rounded-lg">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full">
                        <img
                            src={slide}
                            alt={`Image ${index + 1}`}
                            className="w-full object-contain"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
