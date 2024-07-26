import './HomeBarter.scss';

import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface BarterCard {
    location: string;
    title: string;
    content: string;
    date: string;
    imageSrc: string;
    likeCount: number;
}

interface BarterCardProps {
    barterCards: BarterCard[]
}

export default function HomeBarter({ barterCards }: BarterCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 180; // Adjusted card width for better display within the 390px max-width
    const cardsToShow = 2; // Display two cards at a time
    const cardSpacing = 10; // Space between cards
    const totalWidth = barterCards.length * cardWidth + (barterCards.length - 1) * cardSpacing; // Total width with card spacing

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - cardsToShow < 0 ? 0 : prevIndex - cardsToShow));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + cardsToShow < barterCards.length ? prevIndex + cardsToShow : prevIndex)
        );
    };

    return (
        <div className="home-barter">
            <button className="carousel-button left" onClick={handlePrev}>&lt;</button>
            <div className="carousel-inner" style={{ width: totalWidth, transform: `translateX(-${currentIndex * (cardWidth + cardSpacing)}px)` }}>
                {barterCards.map((card, index) => (
                    <div className="barter-card" key={index} style={{ marginRight: cardSpacing }}>
                        <img className="barter-image" src={card.imageSrc} alt={card.title} />
                        <div className="barter-title">{card.title}</div>
                        <div className="barter-time">{card.date}</div>
                        <div className="barter-likes">
                            <FaHeart className="heart-icon" />
                            <span>{card.likeCount}</span>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-button right" onClick={handleNext}>&gt;</button>
        </div>
    );
}
