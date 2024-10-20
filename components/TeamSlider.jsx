"use client"

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import teamsData from "@constants/Teams.js";

const TeamSlider = () => {
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
    } else if (startX - endX > 100 && activeIndex < Math.ceil(teamsData.length / 3) - 1) {
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
    } else if (startX - endX > 100 && activeIndex < Math.ceil(teamsData.length / 3) - 1) {
      setActiveIndex(activeIndex + 1);
    }
    sliderRef.current.style.transform = `translateX(${-activeIndex * 100}%)`;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className="relative w-full overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Team Cards Container */}
        <div
          ref={sliderRef}
          className="flex transition-transform ease-in-out duration-[600ms]"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {teamsData.map((member, index) => (
            <div
                key={index}
                className="w-[33.33%] flex-shrink-0 flex items-start justify-center px-[0px] my-[32px]"
            >
                {/* Card Content with Fixed Width */}
                <div className="w-full h-full max-w-[317px] flex flex-col justify-center items-center text-center select-none">
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-[317px] h-[350px] rounded-t-lg touch-none"
                    />
                    <div className="flex flex-col justify-around items-center w-full h-full bg-accent">
                        <h3 
                            className="font-workSans font-normal text-[18px] text-primary text-center mx-[16px] mt-[16px] mb-[8px]"
                        >
                        {member.name}
                        </h3>
                        <p
                            className="font-workSans font-bold text-[18px] text-primary tracking-widest uppercase mx-[24px] mb-[8px]"
                        >
                            {member.position}
                        </p>
                    </div>
                    <div className="flex flex-row justify-evenly py-[16px] items-center bg-primary w-full rounded-b-lg">
                        <Link href={member.linkedIn}>
                            <Image
                                src="assets/icons/linkedin.svg"
                                width={24}
                                height={24}
                            />
                        </Link>
                        <Link href={member.facebook}>
                            <Image
                                src="assets/icons/facebook.svg"
                                width={24}
                                height={24}
                            />
                        </Link>
                        <Link href={member.instagram}>
                            <Image
                                src="assets/icons/instagram.svg"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Pagination Dots */}
      <div className="flex mt-4 space-x-2">
        {Array(Math.ceil(teamsData.length / 3)).fill().map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-4 h-4 rounded-full ${
              activeIndex === index ? "bg-primary" : "bg-accent"
            }`}
          />
        ))}
      </div>
    </div>
  );
  
};

export default TeamSlider;