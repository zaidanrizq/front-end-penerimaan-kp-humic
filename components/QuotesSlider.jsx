"use client"

import { useState, useRef } from "react";
import Image from "next/image";
import quotesData from "@constants/Quotes.js";

const QuoteSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const moveX = e.pageX - startX;
    sliderRef.current.style.transform = `translateX(calc(${-activeIndex * 100}% + ${moveX}px))`;
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    const endX = e.pageX;
    if (endX - startX > 100 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (startX - endX > 100 && activeIndex < quotesData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    sliderRef.current.style.transform = `translateX(${-activeIndex * 100}%)`;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX - startX;
    sliderRef.current.style.transform = `translateX(calc(${-activeIndex * 100}% + ${moveX}px))`;
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 100 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (startX - endX > 100 && activeIndex < quotesData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    sliderRef.current.style.transform = `translateX(${-activeIndex * 100}%)`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="relative w-full overflow-hidden h-[441px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform ease-in-out duration-[650ms]"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {quotesData.map((quote, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex items-center justify-center select-none"
              style={{
                backgroundImage: `url(${quote.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "441px",
              }}
            >
              <div className="flex flex-col justify-center text-center bg-primary bg-opacity-60 text-white w-full h-[441px] ">
                <div className="flex flex-col justify-center items-center text-center mx-[400px] mb-[32px] font-workSans font-normal text-[22px]">
                    <Image
                        src="/assets/icons/quote.svg"
                        alt="Quote"
                        width={45}
                        height={30}
                        className="mb-[24px]"
                    />
                    <p className="font-workSans font-normal text-[22px] text-white mb-[24px]">
                        {quote.quote}
                    </p>
                    <Image
                        src="/assets/icons/quote-line.svg"
                        alt="Quote"
                        width={222}
                        height={5}
                        className="mb-[24px]"
                    />
                    <h3 className="font-workSans font-normal text-[22px] text-white">
                        {quote.author}
                    </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute top-[1410px] left-1/2 transform -translate-x-1/2 flex space-x-2">
            {quotesData.map((_, index) => (
                <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-4 h-4 rounded-full ${
                    activeIndex === index ? "bg-accent" : "bg-white"
                }`}
                />
            ))}
      </div>
    </div>
  );
};

export default QuoteSlider;
