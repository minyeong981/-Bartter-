import { useSuspenseQuery } from "@tanstack/react-query";
import classnames from "classnames/bind";
import { useState } from 'react';

import notCrop from '@/assets/image/notCrop.png';
import barter from "@/services/barter";
import querykeys from "@/util/querykeys";

import styles from './UserCrops.module.scss';

const cx = classnames.bind(styles);

interface UserCropsProps {
  userId: number;
  onSelectCrop: (cropId: number) => void;
}

function UserCrops({ userId, onSelectCrop }: UserCropsProps) {
  const { data } = useSuspenseQuery({
    queryKey: [querykeys.CROP_PROFILE, userId],
    queryFn: () => barter.getCropProfileListByUser(userId)
  });

  const crops = data.data.data;
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);

  const handleCropClick = (cropId: number) => {
    setSelectedCropId(cropId);
    onSelectCrop(cropId); // 부모 컴포넌트로 cropId 전달
  };

  return (
    <div className={cx('crops-container')}>
      {crops.length === 0 ? (
        <>
          <h3>아직 등록된 농작물이 없습니다.</h3>
          <img src={notCrop} alt="notCrop" />
        </>
      ) : (
        <>
          <h3 className={cx('crops-count')}>전체 작물 수 : {crops.length}</h3>
          <div className={cx('crop-list')}>
            {crops.map(crop => (
              <div 
                key={crop.cropId} 
                className={cx('crop-card', { selected: selectedCropId === crop.cropId })} 
                onClick={() => handleCropClick(crop.cropId)}
              >
                <div className={cx('crop-image-container', { selected: selectedCropId === crop.cropId })}>
                  <img src={crop.image} alt={crop.nickname} />
                </div>
                <div className={cx('crop-info')}>
                  <h4>{crop.nickname}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserCrops;