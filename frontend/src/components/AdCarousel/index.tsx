import './index.scss';

import {useState} from 'react';

interface Ad {
  id: number;
  content: string;
}

const ads: Ad[] = [
  {id: 1, content: '광고 1'},
  {id: 2, content: '광고 2'},
  {id: 3, content: '광고 3'},
];

export default function AdCarousel() {

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const nextAd = () => {
    setCurrentAdIndex(prevIndex => (prevIndex + 1) % ads.length);
  };

  const prevAd = () => {
    setCurrentAdIndex(prevIndex => (prevIndex - 1 + ads.length) % ads.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-control prev" onClick={prevAd}>
        이전
      </button>
      <div className="carousel-inner">
        {ads.map((ad, index) => (
          <div
            key={ad.id}
            className={`carousel-item ${index === currentAdIndex ? 'active' : ''}`}
          >
            {ad.content}
          </div>
        ))}
      </div>
      <button className="carousel-control next" onClick={nextAd}>
        다음
      </button>
    </div>
  );
}
