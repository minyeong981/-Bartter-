import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import WarehouseAnimation from '@/assets/lottie/warehouse.json'
import MyCrops from '@/components/Crop/MyCrops';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import type { Crop } from '@/store/diarySlice';

import styles from './index.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/profile/$nickname/cropStorage/')({
  component: CropStoragePage,
});

function CropStoragePage() {
  const { nickname } = Route.useParams();
  const [myCrops, setMyCrops] = useState<Crop[]>([]); 
  const [receivedCrops, setReceivedCrops] = useState<Crop[]>([]); // 받은 농작물 데이터
  const [isMyCrops, setIsMyCrops] = useState(true); 

  useEffect(() => {
    setMyCrops([
      { id: 1, nickname: '작물1', date: '1', description: '', image: '', name: '' },
      { id: 2, nickname: '작물2', date: '1', description: '', image: '', name: '' },
    ]); // 실제로는 API 등을 통해 데이터를 가져옴
    setReceivedCrops([
      { id: 3, nickname: '받은작물1', date: '1', description: '', image: '', name: '' },
      { id: 4, nickname: '받은작물2', date: '1', description: '', image: '', name: '' },
    ]); 
  }, []);

  const handleToggle = (showMyCrops: boolean) => {
    setIsMyCrops(showMyCrops);
  };

  const handleCropClick = (cropId: number) => {
    const newUrl = `/diary/growDiary/${cropId}`;
    window.location.href = newUrl;
  };

  return (
    <div>
      <HeaderWithLabelAndBackButton label="농작물 창고" />
      <div className={cx('cropStorageContainer')}>
        <h1>{nickname}님</h1>
        <h1>
          {isMyCrops
            ? `나의 작물 ${myCrops.length}개`
            : `물물교환 / 나눔 작물 ${receivedCrops.length}개`}
        </h1>
        <p>
          {isMyCrops
            ? '나의 농작물을 선택하면 해당 농작물의 농사일지를 볼 수 있어요'
            : (
              <>
                물물교환 / 나눔 받은 작물이에요. <br />
                받은 농작물을 선택하면 해당 농작물의 농사일지를 볼 수 있어요
              </>
            )}
        </p>
        <div className={cx('storageImage')}>
          {/* <img src={Storage} alt="Storage" /> */}
          <Lottie loop animationData={WarehouseAnimation} play className={cx('animation')}  />
        </div>
        <div className={cx('toggleContainer')}>
          <button
            className={cx('toggleButton', { active: isMyCrops })}
            onClick={() => handleToggle(true)}
          >
            나의 농작물
          </button>
          <button
            className={cx('toggleButton', { active: !isMyCrops })}
            onClick={() => handleToggle(false)}
          >
            받은 농작물
          </button>
        </div>
        {isMyCrops ? (
          <div className={cx('myCropsContainer')}>
            <MyCrops crops={myCrops} onCropClick={handleCropClick} />
          </div>
        ) : (
          <div className={cx('receivedCropsContainer')}>
            받은 작물
            {/* <MyCrops crops={receivedCrops} onCropClick={handleCropClick} /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropStoragePage;
