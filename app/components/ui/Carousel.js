import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Carousel component to display images in a sliding format.
 * @param {Object} props - The component props.
 * @param {string[]} props.images - An array of image URLs to be displayed in the carousel.
 * @returns {JSX.Element} The rendered carousel component.
 */
export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    /**
     * Navigate to the previous image.
     * @param {Event} event - The click event.
     */
    const goToPrevious = (event) => {
        event.preventDefault();
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    /**
     * Navigate to the next image.
     * @param {Event} event - The click event.
     */
    const goToNext = (event) => {
        event.preventDefault();
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    /**
     * Navigate to a specific image by index.
     * @param {number} index - The index of the image to navigate to.
     */
    const goToIndex = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="w-full h-52 bg-gray-200 flex items-center justify-center">
            <div className="w-full h-52 relative">
                <div className="flex h-full snap-mandatory overflow-hidden rounded-lg snap-x scroll-smooth">
                    {/* Main Image */}
                    <div className="flex justify-center w-full h-full">
                        <Image
                            src={images[currentIndex]}
                            alt={`Image ${currentIndex + 1}`}
                            fill
                            sizes="100%"
                            className="object-cover rounded-md"
                        />
                    </div>

                    {/* Left and Right Controls */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2  text-[#edd282] p-2 rounded-full hover:bg-[#ffebe5] transition-colors"
                                aria-label="Previous image"
                            >
                                <FaChevronLeft size={20} />
                            </button>

                            <button
                                onClick={goToNext}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2  text-[#edd282] p-2 rounded-full hover:bg-[#ffebe5] transition-colors"
                                aria-label="Next image"
                            >
                                <FaChevronRight size={20} />
                            </button>
                        </>
                    )}

                    {/* Dots to indicate the current image */}
                    <div className="absolute bottom-2 w-full flex justify-center items-center space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#fc9d4f]' : 'bg-gray-200'
                                    } focus:outline-none`}
                                onClick={() => goToIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}