import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import notCrop from '@/assets/image/notCrop.png';
import GeneralButton from '@/components/Buttons/GeneralButton';
import CropModal from '@/components/Crop/CropModal';
import MyCrops from '@/components/Crop/myCrops';
import useRootStore from '@/store';

import styles from './mainCrops.module.scss';

const cx = classnames.bind(styles);

export default function MainCrops() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { addCrop, crops, loadCrops, nickname, date, description, initialImage } = useRootStore(state => ({
    addCrop: state.addCrop,
    crops: state.crops,
    loadCrops: state.loadCrops,
    nickname: state.nickname,
    date: state.date,
    description: state.description,
    initialImage: state.initialImage,
  }));

  useEffect(() => {
    loadCrops();
  }, [loadCrops]);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCropSelect(id: number) {
    const selectedCrop = crops.find(crop => crop.id === id);
    if (selectedCrop) {
      addCrop({
        id: selectedCrop.id,
        nickname: nickname || selectedCrop.name,
        image: initialImage || selectedCrop.image,
        date: date,
        description: description,
      });
      navigate({
        to: '/growDiary/$cropId',
      });
    }
  }

  const displayCrops = crops.map(({ id, nickname, image }) => ({
    id,
    nickname: nickname!,
    image: image || initialImage,
  }));

  return (
    <div className={cx('container')}>
      {crops.length === 0 ? (
        <div className={cx('no-crops')}>
          <h3>아직 등록된 농작물이 없습니다.</h3>
          <img src={notCrop} alt="notCrop" />
        </div>
      ) : (
        <MyCrops crops={displayCrops} onCropClick={handleCropSelect} />
      )}
      <CropModal
        show={showModal}
        onClose={handleCloseModal}
        onCropSelect={handleCropSelect}
        selectedCrop={null}
        showSearchBar={true}
      />
      <div className={cx('floating-button')}>
        <GeneralButton
          buttonStyle={{ style: 'floating', size: 'small' }}
          onClick={handleOpenModal}
        >
          + 등록하기
        </GeneralButton>
      </div>
    </div>
  );
}
