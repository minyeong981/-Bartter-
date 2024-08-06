import { useQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { useState } from 'react';

import xIcon from '@/assets/image/xIcon.png'
import CropButton from '@/components/Buttons/CropButton';
import LinkButton from '@/components/Buttons/LinkButton';
import barter from '@/services/barter';

import Search from '../Search/Search';
import styles from './CropModal.module.scss';

const cx = classnames.bind(styles);

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

export interface SearchParamCrop {
  crop: CropCategoryDetail
}

export default function CropModal({ onClose, showSearchBar }: { onClose: () => void, showSearchBar?: boolean }) {
  const { data } = useQuery({
    queryKey: ['cropsCategory'],
    queryFn: barter.getCropCategoryList,
  });

  const [selectedCrop, setSelectedCrop] = useState<CropCategoryDetail>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  function handleSelectCrop(crop: CropCategoryDetail) {
    setSelectedCrop(crop);
  }

  const searchTermLower = searchTerm.toLowerCase();
  const searchTermDecomposed = decomposeHangul(searchTermLower);

  const filteredCrops = data?.data.data.filter((crop: CropCategoryDetail) => {
    const cropName = crop.name.toLowerCase();
    const cropDecomposed = decomposeHangul(cropName);

    return cropName.includes(searchTermLower) || cropDecomposed.startsWith(searchTermDecomposed);
  }) || [];

  return (
    <div className={cx('modalBackdrop')}>
      <div className={cx('modalContent')}>
        <button className={cx('closeButton')} onClick={onClose}>
          <img src={xIcon} alt="closeButton" />
        </button>
        {showSearchBar && <Search onSearch={setSearchTerm} />}
        <div className={cx('cropList')}>
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop: CropCategoryDetail, index: number) => (
              <CropButton
                key={`${index}-${crop.name}`}
                onClick={() => handleSelectCrop(crop)}
                value={crop.name}
                imgUrl={crop.image || ''}
                selected={selectedCrop?.name === crop.name}
              />
            ))
          ) : (
            <div>해당 작물이 없습니다.</div>
          )}
        </div>
        <div className={cx('buttonContainer')}>
          <LinkButton
            buttonStyle={{ style: 'primary', size: 'large' }}
            to="/diary/registerCrop/1"
            disabled={selectedCrop === null}
            search={{crop:selectedCrop}}
          >
            다음
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
