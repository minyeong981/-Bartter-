import {useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useEffect} from 'react';

import notCrop from '@/assets/image/notCrop.png';
import MyCrops from '@/components/Crop/MyCrops.tsx';
import useRootStore from '@/store';

import styles from './mainCrops.module.scss';

const cx = classnames.bind(styles);

export default function MainCrops() {
  const navigate = useNavigate();
  const {addCrop, crops, loadCrops, nickname, date, description, initialImage} =
    useRootStore(state => ({
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


  function handleCropSelect(id: number) {
    const selectedCrop = crops.find(crop => crop.id === id);
    if (selectedCrop) {
      addCrop({
        id: selectedCrop.id,
        nickname: nickname || selectedCrop.name,
        image: initialImage || selectedCrop.image,
        date: date,
        description: description,
        name: selectedCrop.name,
      });
      navigate({
        to: '/diary/growDiary/$cropId',
        params: {cropId: id.toString()},
      });
    }
  }

  return (
    <div className={cx('container')}>
      {crops.length === 0 ? (
        <div className={cx('no-crops')}>
          <h3>아직 등록된 농작물이 없습니다.</h3>
          <img src={notCrop} alt="notCrop" />
        </div>
      ) : (
        <MyCrops crops={crops} onCropClick={handleCropSelect} />
      )}
      {/* <CropModal
        show={showModal}
        onClose={handleCloseModal}
        onCropSelect={handleCropSelect}
        selectedCrop={null}
        showSearchBar={true}
      /> */}
      </div>

  );
}
