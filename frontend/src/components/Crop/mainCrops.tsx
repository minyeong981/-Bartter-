import classnames from 'classnames/bind';
import {useState} from 'react';

import appleImage from '@/assets/image/apple.png';
import beanImage from '@/assets/image/bean.png';
import carrotImage from '@/assets/image/carrot.png';
import notCrop from '@/assets/image/notCrop.png';
import GeneralButton from '@/components/Buttons/GeneralButton';
import CropModal from '@/components/Crop/CropModal';
import MyCrops from '@/components/Crop/myCrops';
import useMyCropsStore from '@/store/myCropsStore';
import useRegisterCropStore from '@/store/registerCropStore';

import styles from './mainCrops.module.scss';

const cx = classnames.bind(styles);

const initialCrops = [
  {id: 1, name: '사과', image: appleImage},
  {id: 2, name: '콩', image: beanImage},
  {id: 3, name: '당근', image: carrotImage},
];

export default function MainCrops() {
  const [showModal, setShowModal] = useState(false);
  const {addCrop, crops} = useMyCropsStore();

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCropSelect(id: number) {
    const selectedCrop = initialCrops.find(crop => crop.id === id);
    if (selectedCrop) {
      const {nickname, date, description} = useRegisterCropStore.getState();
      addCrop({
        id: selectedCrop.id,
        nickname: nickname || selectedCrop.name,
        image: selectedCrop.image, // 이미지 URL만 저장
        date: date,
        description: description,
      });
    }
    setShowModal(false);
  }

  const displayCrops = crops.map(({id, nickname, image}) => ({
    id,
    nickname,
    image,
  }));

  return (
    <div className={cx('container')}>
      {crops.length === 0 ? (
        <div className={cx('no-crops')}>
          <h3>아직 등록된 농작물이 없습니다.</h3>
          <img src={notCrop} alt="notCrop" />
        </div>
      ) : (
        <MyCrops crops={displayCrops} />
      )}
      <CropModal
        show={showModal}
        onClose={handleCloseModal}
        crops={initialCrops}
        onCropSelect={handleCropSelect}
        selectedCrop={null}
        showSearchBar={true}
      />
      <div className={cx('floating-button')}>
        <GeneralButton
          buttonStyle={{style: 'floating', size: 'small'}}
          onClick={handleOpenModal}
        >
          + 등록하기
        </GeneralButton>
      </div>
    </div>
  );
}