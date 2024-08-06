import { useQuery } from "@tanstack/react-query";
import classnames from "classnames/bind";
import { useEffect, useState } from 'react';

import barter from "@/services/barter";

import styles from './myCrops.module.scss';

const cx = classnames.bind(styles);

interface MyCropsProps {
  userId: number; // userId를 MyCropsProps에 추가
  onCropClick: (id: number) => void;
}

function MyCrops({ userId, onCropClick }: MyCropsProps) {
  const { data } = useQuery({
    queryKey: ['cropProfile', userId],
    queryFn: () => barter.getCropProfileListByUser(userId)
  })

  const crops = data?.data.data

  const handleCropClick = (id: number) => {
    setSelectedCropId(id);
    onCropClick(id);
    navigate({ to: `/diary/crop/${id}` });
  };


  return (
    <div className={cx('crops-container')}>
      <h3 className={cx('crops-count')}>전체 작물 수 : {crops.length}</h3>
      <div className={cx('crop-list')}>
        {crops.map((crop,index) => (
          <div 
            key={`${index}-${crop.id}`} 
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
