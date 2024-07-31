import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton.tsx';
import useRootStore from '@/store';

import Search from '../Search/Search';
import Crop from './Crop';
import styles from './CropModal.module.scss';

const cx = classnames.bind(styles);

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onCropSelect: (id: number) => void;
  selectedCrop: number | null;
  showSearchBar?: boolean;
}

export default function CropModal({
  show,
  onClose,
  onCropSelect,
  selectedCrop,
  showSearchBar = false,
}: ModalProps) {
  const { setInitialImage } = useRootStore(state => ({
    setInitialImage: state.setInitialImage,
  }));
  const [selectedCropId, setSelectedCropId] = useState<number | null>(selectedCrop);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSelectedCropId(selectedCrop);
  }, [selectedCrop]);

  const handleCropClick = (id: number, image: string) => {
    setSelectedCropId(id);
    setInitialImage(image); // 이미지 설정
    onCropSelect(id);
  };

  if (!show) {
    return null;
  }

  return (
    <div className={cx('modalBackdrop')}>
      <div className={cx('modalContent')}>
        <button className={cx('closeButton')} onClick={onClose}>
          X
        </button>
        {showSearchBar && <Search onSearch={setSearchTerm} />}
        <div className={cx('cropList')}>
          <Crop searchTerm={searchTerm} onCropClick={handleCropClick} selectedCropId={selectedCropId} />
        </div>
        <div className={cx('buttonContainer')}>
          <LinkButton
            buttonStyle={{ style: 'primary', size: 'large' }}
            to="/diary/registerCrop/1"
            disabled={selectedCropId === null} // 선택된 작물이 없을 때 비활성화
          >
            다음
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
