"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";

// Sample data for client ratings
const clientRatings = [
  {
    id: 1,
    projectName: "Web App for Order Management",
    starRating: 5,
    dateRange: "May 8, 2024 - Jun 23, 2024",
    review:
      "I highly recommend Uday for their exceptional work on our order management web app. They developed and hosted it on AWS, significantly improving our business operations and growth. Always responsive and timely, their support has been invaluable. An outstanding developer and a pleasure to work with!",
    image: "/images/project1.jpg", // Replace with your own image paths
  },
  {
    id: 2,
    projectName: "Develop Django Plugin",
    starRating: 5,
    dateRange: "Mar 29, 2024 - Apr 3, 2024",
    review:
      "Uday is very good at Django/Python, he quickly understood our requirement and delivered a quality Python plugin as per our requirement. I wish to work with him again in the near future.",
    image: "/images/project2.jpg", // Replace with your own image paths
  },
  {
    id: 3,
    projectName: "Host Web App",
    starRating: 5,
    dateRange: "Mar 21, 2024 - Mar 22, 2024",
    review:
      "He did everything asked of him and he did it promptly. He was also VERY communicative.",
    image: "/images/project3.jpg", // Replace with your own image paths
  },
  {
    id: 4,
    projectName: "Social Media Platform (Neighborhood)",
    starRating: 4.8,
    dateRange: "Feb 27, 2024 - Mar 8, 2024",
    review:
      "Udaysantoshkumar went above and beyond in delivering more than was asked of him. He was extremely communicative and polite. He also demonstrated expertise in his area (Python programming). I would hire him again.",
    image: "/images/project4.jpg", // Replace with your own image paths
  },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 !== 0; // Check for half star
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex justify-center mb-2">
      {/* Render full stars */}
      {Array.from({ length: filledStars }, (_, i) => (
        <span key={`full-${i}`} className="text-yellow-500 text-xl">★</span>
      ))}

      {/* Render half star if needed */}
      {hasHalfStar && (
        <span className="text-yellow-500 text-xl">☆</span>
      )}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-xl">★</span>
      ))}
    </div>
  );
};


// Carousel Component
export default function ClientRatingsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSlide]);

  const handleNextSlide = () => {
    let newSlide = currentSlide === clientRatings.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? clientRatings.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <section id="reviews" className="mt-10 p-5 bg-gray-800 text-white rounded-lg max-w-full mx-auto">
      <h2 className="text-center text-3xl font-bold mb-8">Client Reviews from Upwork</h2>
      
      {/* Carousel */}
      <div className="relative">
        {/* Previous Button */}
        <AiOutlineLeft
          onClick={handlePrevSlide}
          className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
        />
        <div className="w-full h-[50vh] flex overflow-hidden relative m-auto">
          <Swipe
            onSwipeLeft={handleNextSlide}
            onSwipeRight={handlePrevSlide}
            className="relative z-10 w-full h-full"
          >
            {clientRatings.map((rating, index) => {
              if (index === currentSlide) {
                return (
                  <div key={rating.id} className="relative w-full h-full flex flex-col items-center justify-center text-center p-8">
                    {/* <Image
                      src={rating.image}
                      alt={rating.projectName}
                      layout="fill"
                      objectFit="cover"
                      className="animate-fadeIn rounded-lg"
                    /> */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-4">
                      <h3 className="text-2xl font-semibold mb-2">{rating.projectName}</h3>
                      <StarRating rating={rating.starRating} /> 
                      <p className="text-sm mb-4">{rating.dateRange}</p>
                      <p className="text-lg italic mb-6">&quot;{rating.review}&quot;</p>
                    </div>
                  </div>
                );
              }
            })}
          </Swipe>
        </div>
        {/* Next Button */}
        <AiOutlineRight
          onClick={handleNextSlide}
          className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-20"
        />

        {/* Dots for Navigation */}
        <div className="relative flex justify-center p-2">
          {clientRatings.map((_, index) => (
            <div
              className={
                index === currentSlide
                  ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Hire Me Button */}
      <div className="flex justify-center mt-8">
        <Link
          href="https://www.upwork.com/freelancers/~01f8bcbcd3babc7b1c"
          target="_blank"
          className="px-6 py-3 text-center rounded-full bg-gradient-to-br from-green-500 to-green-700 hover:bg-green-600 text-white"
        >
          Hire Me on Upwork
        </Link>
      </div>
    </section>
  );
}
