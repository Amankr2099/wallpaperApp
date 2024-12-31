import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopRecentWalls } from '../lib/appwrite';

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopRecentWalls();
        // console.log(response);
        
        setImages(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // Added empty dependency array to avoid infinite loop

  // Auto-slide the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <div className="px-2">
      <div className="text-center md:text-3xl mt-16 mb-8 sm:text-xl">
        Top Trendings
      </div>
      <div className="relative max-w-md max-h-screen mx-auto overflow-hidden rounded-lg shadow-lg">
        {/* Carousel Images */}
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full relative">
              <Link to={`/wallpaper/${image.$id}`}>
                <img
                  src={image.imageURL}
                  alt={`Wall ${index + 1}`}
                  className="h-auto w-full object-contain rounded-lg"
                />
              </Link>

              {/* Image Title */}
              <div
                className="absolute text-center top-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded"
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '20px', // Adjust this for smaller text size
                  fontWeight: '400',
                  padding: '4px 8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '4px',
                }}
              >
                {image.title}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
