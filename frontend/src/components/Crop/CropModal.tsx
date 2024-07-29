import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton'

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

export default function CropModal({ show, onClose, crops, onCropSelect, selectedCrop, showSearchBar = false }: ModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!show) {
    return null;
  }

  const handleCropClick = (index: number) => {
    onCropSelect(index);
  };

  const filteredCrops = crops.filter(crop =>
    crop.cropNameSrc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        {showSearchBar && (
          <Search onSearch={setSearchTerm} />
        )}
        <div className={styles.cropList}>
        {filteredCrops.map((crop, index) => (
            <div
              key={index}
              className={`${styles.cropItem} ${selectedCrop === index ? styles.selected : ''}`}
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
        <LinkButton buttonStyle={{style:'primary', size:'large'}} to='/diary/createCrop/nickname'>다음</LinkButton>
      </div>
    </div>
  );
}
