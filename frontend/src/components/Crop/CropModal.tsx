import LinkButton from '@/components/Buttons/LinkButton'

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
}

export default function CropModal({ show, onClose, crops, onCropSelect, selectedCrop }: ModalProps) {
  if (!show) {
    return null;
  }

  const handleCropClick = (index: number) => {
    onCropSelect(index);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <div className={styles.cropList}>
          {crops.map((crop, index) => (
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
        <LinkButton buttonStyle={{style:'primary', size:'large'}}>다음</LinkButton>
      </div>
    </div>
  );
}
