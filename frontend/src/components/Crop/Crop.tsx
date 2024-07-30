import './Crop.scss';

import { useState } from 'react';

import crops from '@/store/copsStore';

interface CropProps {
  searchTerm: string;
}

// 초성, 중성, 종성을 분리하는 함수
const decomposeHangul = (text: string) => {
  const INITIALS = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
  ];
  const MEDIALS = [
    "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"
  ];
  const FINALS = [
    "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
  ];

  return text.split('').map(char => {
    const code = char.charCodeAt(0) - 44032;
    if (code >= 0 && code <= 11171) {
      const initial = INITIALS[Math.floor(code / 588)];
      const medial = MEDIALS[Math.floor((code % 588) / 28)];
      const final = FINALS[code % 28];
      return initial + medial + final;
    } else {
      return char;
    }
  }).join('');
};

export default function Crop({ searchTerm }: CropProps) {
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);

  const handleCropClick = (id: number) => {
    setSelectedCropId(id);
  };

  const searchTermLower = searchTerm.toLowerCase();
  const searchTermDecomposed = decomposeHangul(searchTermLower);

  const filteredCrops = crops.filter((crop) => {
    const cropName = crop.name.toLowerCase();
    const cropDecomposed = decomposeHangul(cropName);

    // 검색어가 초성, 초성+중성, 초성+중성+종성에 따라 필터링
    return cropName.includes(searchTermLower) || cropDecomposed.startsWith(searchTermDecomposed);
  });

  const cropsToShow = searchTerm ? filteredCrops : crops;

  return (
    <div className="crops-component">
      <div className="crops-list">
        {cropsToShow.length > 0 ? (
          cropsToShow.map((crop) => (
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
          ))
        ) : (
          <div>해당 작물이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
