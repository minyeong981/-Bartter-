import './Crop.scss';

import { useState } from 'react';

import crops from '@/store/copsStore';

export default function Crop() {
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);

  const handleCropClick = (id: number) => {
    setSelectedCropId(id);
  };

  return (
    <div className="crops-component">
      <div className="crops-list">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className={`crop-card ${selectedCropId === crop.id ? 'selected' : ''}`}
            onClick={() => handleCropClick(crop.id)}
          >
            <div className="crop-image-container">
              <img src={crop.image} alt={crop.name} className="crop-image" />
            </div>
            <div className="crop-name">{crop.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


