'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './slider.module.scss';
import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";

type SliderProps = {
    children: React.ReactNode;
    slidesPerView: number;
    autoplaySpeed?: number; // in milliseconds, set to 0 to disable autoplay
    showArrows?: boolean;
    showDots?: boolean;
    horizontalFade?: boolean;
    slideGap?: number;
};

const Slider: React.FC<SliderProps> = ({
    children,
    slidesPerView,
    autoplaySpeed = 3000,
    showArrows = false,
    showDots = false,
    horizontalFade = false,
    slideGap = 0
}) => {
    const [current, setCurrent] = useState(0);
    const totalSlides = React.Children.count(children);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef(0);
    const dragEnd = useRef(0);
    const numberOfDots = Math.ceil(totalSlides / slidesPerView);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        dragStart.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (isDragging) {
            dragEnd.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
        }
    };


    const handleDragEnd = () => {
        if (isDragging) {
            setIsDragging(false);
            const dragDistance = dragStart.current - dragEnd.current;

            if (dragDistance > 75 && current < totalSlides - slidesPerView) { // Dragging left with more slides to the right
                handleNextSlide();
            } else if (dragDistance < -75 && current > 0) { // Dragging right with more slides to the left
                handlePrevSlide();
            }
        }
    };

    const handleNextSlide = () => {
        if (current < totalSlides - slidesPerView) {
            setCurrent(current + 1);
        } else {
            setCurrent(0); // Loop back to the start
        }
    };

    const handlePrevSlide = () => {
        if (current > 0) {
            setCurrent(current - 1);
        } else {
            setCurrent(totalSlides - slidesPerView); // Loop to the end
        }
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (autoplaySpeed > 0) {
            interval = setInterval(handleNextSlide, autoplaySpeed);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [current, autoplaySpeed, handleNextSlide]);


    const slideWidth = 100 / slidesPerView;
    const containerShift = `-${current * slideWidth}%`;

    return (
        <section className={styles.container}>
            {horizontalFade && <div className={styles.horizontalFade}></div>}
            {showArrows && (
                <>
                    <span className={styles.leftArrow} onClick={handlePrevSlide}>
                        <ArrowLeft />
                    </span>
                    <span className={styles.rightArrow} onClick={handleNextSlide}>
                        <ArrowRight />
                    </span>
                </>
            )}
            <div
                className={styles.slidesContainer}
                ref={containerRef}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={() => isDragging && handleDragEnd()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                    transform: `translateX(-${current * (100 / slidesPerView)}%)`,
                    paddingLeft: `${slideGap / 2}px`, // Dynamic left padding based on slideGap
                    paddingRight: `${slideGap / 2}px`, // Dynamic right padding based on slideGap
                }}
            >
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`${styles.slide} single-slide`}
                        key={index}
                        style={{
                            width: `calc(${slideWidth}% - ${slideGap * (slidesPerView - 1) / slidesPerView}px)`,
                            marginRight: index === totalSlides - 1 ? 0 : slideGap, // No right margin for the last slide
                        }}
                    >
                        {child}
                    </div>
                ))}
            </div>
            {showDots && (
                <div className={styles.dots}>
                    {Array.from({ length: numberOfDots }).map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${(index * slidesPerView === current) ||
                                (index === numberOfDots - 1 && current >= totalSlides - slidesPerView)
                                ? styles.active : ''
                                }`}
                            onClick={() => {
                                const targetIndex = index * slidesPerView;
                                if (targetIndex < totalSlides - slidesPerView) {
                                    setCurrent(targetIndex);
                                } else {
                                    // Handle the last group of slides
                                    setCurrent(totalSlides - slidesPerView);
                                }
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Slider;
