import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import useRootStore from '@/store';

import styles from './myCrops.module.scss';

const cx = classnames.bind(styles);

interface MyCropsProps {
  crops: {
    id: number;
    nickname: string;
    image: string;
  }[];
  onCropClick: (id: number) => void; // 추가된 prop
}

function MyCrops({ crops, onCropClick }: MyCropsProps) {
  const { loadCrops, setInitialImage } = useRootStore(state => ({
    loadCrops: state.loadCrops,
    setInitialImage: state.setInitialImage,
  }));
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);

  useEffect(() => {
    loadCrops();
  }, [loadCrops]);

  const handleCropClick = (id: number, image: string) => {
    setSelectedCropId(id);
    setInitialImage(image);
    onCropClick(id); // 추가된 콜백 호출
  };

  return (
    <div className={cx('crops-container')}>
      <h3 className={cx('crops-count')}>전체 작물 수 : {crops.length}</h3>
      <div className={cx('crop-list')}>
        {crops.map(crop => (
          <div 
            key={crop.id} 
            className={cx('crop-card', { selected: selectedCropId === crop.id })} 
            onClick={() => handleCropClick(crop.id, crop.image)}
          >
            <div className={cx('crop-image-container', { selected: selectedCropId === crop.id })}>
              <img
                src={crop.image}
                alt={crop.nickname}
                className={cx('crop-image', {
                  'default-image': selectedCropId !== crop.id,
                  'uploaded-image': selectedCropId === crop.id,
                })}
              />
            </div>
            <div className={cx('crop-info')}>
              <h4>{crop.nickname}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCrops;
