import classnames from 'classnames/bind';
import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import crops from '@/store/copsStore';

import Search from '../Search/Search';
import Crop from './Crop';
import styles from './CropModal.module.scss';

const cx = classnames.bind(styles);

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onCropSelect: (index: number) => void;
  selectedCrop: number | null;
  showSearchBar?: boolean;
}

export default function CropModal({
  show,
  onClose,
  selectedCrop,
  showSearchBar = false,
}: ModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!show) {
    return null;
  }


  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cx('modalBackdrop')}>
      <div className={cx('modalContent')}>
        <button className={cx('closeButton')} onClick={onClose}>
          X
        </button>
        {showSearchBar && <Search onSearch={setSearchTerm} />}
        <div className={cx('cropList')} />
        <Crop/>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to='/diary/registerCrop/1'
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}
