import { useSuspenseQuery } from "@tanstack/react-query";
import classnames from "classnames/bind";
import { useState } from 'react';

import barter from "@/services/barter";
import querykeys from "@/util/querykeys";

import EmptyPost from "../Empty/EmptyPost";
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

  const crops = data?.data?.data || [];
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);

  const handleCropClick = (cropId: number) => {
    setSelectedCropId(cropId);
    onSelectCrop(cropId); // 부모 컴포넌트로 cropId 전달
  };

  return (
    <div className={cx('cropsContainer')}>
      {crops.length === 0 ? (
        <div className={cx('noCrops')}>
          <EmptyPost text="등록된 농작물이 없습니다."/>
        </div>
      ) : (
        <div className={cx('mainContainer')}>
          <h3 className={cx('cropsCount')}>전체 작물 수 : {crops.length}</h3>
          <div className={cx('cropList')}>
            {crops.map(crop => (
              <div 
                key={crop.cropId} 
                className={cx('cropCard', { selected: selectedCropId === crop.cropId })} 
                onClick={() => handleCropClick(crop.cropId)}
              >
                <div className={cx('cropImageContainer', { selected: selectedCropId === crop.cropId })}>
                  <img src={crop.image} alt={crop.nickname} />
                </div>
                <div className={cx('cropInfo')}>
                  <h4>{crop.nickname}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCrops;