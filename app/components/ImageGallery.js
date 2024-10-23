import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Use FontAwesome for carousel controls

export default function ImageGallery({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0); // State to track the current image index

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex); // Go to the previous image or wrap around to the last
    };

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex); // Go to the next image or wrap around to the first
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Display the current image */}
            <div className="flex justify-center">
                <Image
                    src={images[currentIndex]} // Current image from the array
                    alt={`Recipe image ${currentIndex + 1}`}
                    width={600}
                    height={400}
                    className="object-cover rounded-md"
                />
            </div>

            {/* Left arrow button */}
            <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-400 transition-colors"
            >
                <FaChevronLeft size={24} />
            </button>

            {/* Right arrow button */}
            <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-400 transition-colors"
            >
                <FaChevronRight size={24} />
            </button>

            {/* Dots indicating current slide */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-green-600' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}
