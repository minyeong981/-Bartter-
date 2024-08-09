import { useQuery } from "@tanstack/react-query";
import classnames from "classnames/bind";
import { useEffect, useState } from 'react';

import notCrop from '@/assets/image/notCrop.png';
import barter from "@/services/barter";

import styles from './UserCrops.module.scss';

const cx = classnames.bind(styles);

interface UserCropsProps {
  userId: number;
  onSelectCrop: (cropId: number) => void;
}

function UserCrops({ userId, onSelectCrop }: UserCropsProps) {
  const { data } = useQuery({
    queryKey: ['cropProfile', userId],
    queryFn: () => barter.getCropProfileListByUser(userId)
  });

  const crops = data?.data.data || [];
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<Record<number, string>>({});

  useEffect(() => {
    if (crops.length) {
      for (const crop of crops) {
        const { image } = crop;
        if (image instanceof Blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageUrl(prev => ({ ...prev, [crop.cropId]: reader.result as string }));
          };
          reader.readAsDataURL(image);
        } else if (typeof image === 'string') {
          setImageUrl(prev => ({ ...prev, [crop.cropId]: image }));
        }
      }
    }
  }, [crops]);

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
                  {imageUrl[crop.cropId] ? (
                    <img
                      src={imageUrl[crop.cropId]}
                      alt={crop.nickname}
                      className={cx('crop-image', {
                        'default-image': selectedCropId !== crop.cropId,
                        'uploaded-image': selectedCropId === crop.cropId,
                      })}
                    />
                  ) : (
                    <span>
                      로딩 중 입니다. 잠시만 기다려주세요
                      <br />
                      {/* <Spinner /> */}
                    </span>
                  )}
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
