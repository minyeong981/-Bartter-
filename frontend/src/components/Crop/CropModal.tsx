import classnames from 'classnames/bind';
import {useState} from 'react';

import LinkButton from '@/components/Buttons/LinkButton';

import Search from '../Search/Search';
import Crop from './Crop';
import styles from './CropModal.module.scss';

interface CropProps {
  cropImageSrc: string;
  cropNameSrc: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  crops: CropProps[];
  onCropSelect: (index: number) => void;
  selectedCrop: number | null;
  showSearchBar?: boolean;
}

const cx = classnames.bind(styles);

export default function CropModal({
  show,
  onClose,
  crops,
  onCropSelect,
  selectedCrop,
  showSearchBar = false,
}: ModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!show) {
    return null;
  }

  const handleCropClick = (index: number) => {
    onCropSelect(index);
  };

  const filteredCrops = crops.filter(crop =>
    crop.cropNameSrc.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={cx('modalBackdrop')}>
      <div className={cx('modalContent')}>
        <button className={cx('closeButton')} onClick={onClose}>
          X
        </button>
        {showSearchBar && <Search onSearch={setSearchTerm} />}
        <div className={cx('cropList')}>
          {filteredCrops.map((crop, index) => (
            <div
              key={index}
              className={cx('cropItem', {selected: selectedCrop === index})}
              onClick={() => handleCropClick(index)}
            >
              <Crop
                cropImageSrc={crop.cropImageSrc}
                cropNameSrc={crop.cropNameSrc}
                isSelected={selectedCrop === index}
              />
            </div>
          ))}
        </div>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/diary/createCrop/nickname"
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}