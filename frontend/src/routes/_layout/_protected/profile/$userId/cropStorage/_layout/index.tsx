import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';
import Lottie from 'react-lottie-player';

import WarehouseAnimation from '@/assets/lottie/warehouse.json';
// import GeneralButton from '@/components/Buttons/GeneralButton';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../cropStorage.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/profile/$userId/cropStorage/_layout/')({
  component: CropStoragePage,
});

function CropStoragePage() {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const [isUserCrops, setIsUserCrops] = useState(true);

  const { data: userProfileInfo } = useSuspenseQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId))
  });

  const { data: userCropsStorage } = useSuspenseQuery({
    queryKey: [querykeys.CROP_PROFILE, userId],
    queryFn: () => barter.getCropProfileListByUser(Number(userId)),
  });

  const { data: userTradesStorage } = useSuspenseQuery({
    queryKey: [querykeys.CROP_PROFILE, userId],
    queryFn: () => barter.getCropListTradedByUser(Number(userId)),
  });

  const handleToggle = (showUserCrops) => {
    setIsUserCrops(showUserCrops);
  };

  const handleCropClick = (cropId : number) => {
    navigate({to:`/diary/growDiary/${cropId}`});
  };

  // const handleBarterClick = () => {
  //   navigate('/trade');
  // };

  const myCrops = userCropsStorage?.data?.data || [];
  const receivedCrops = userTradesStorage?.data?.data?.receive || [];

  return (
    <div>
      <div className={cx('cropStorageContainer')}>
        <h1>{userProfileInfo.data.data.nickname}님</h1>
        <h1>
          {isUserCrops
            ? `나의 작물 ${myCrops.length}개`
            : `물물교환 / 나눔 작물 ${receivedCrops.length}개`}
        </h1>
        <p>
          {isUserCrops
            ? '나의 농작물을 선택하면 해당 농작물의 농사일지를 볼 수 있어요'
            : '물물교환 / 나눔 받은 작물이에요. 받은 농작물을 선택하면 해당 농작물의 농사일지를 볼 수 있어요'}
        </p>
        <div className={cx('storageImage')}>
          <Lottie loop animationData={WarehouseAnimation} play className={cx('animation')} />
        </div>
        <div className={cx('toggleContainer')}>
          <button className={cx('toggleButton', { active: isUserCrops })} onClick={() => handleToggle(true)}>
            나의 농작물
          </button>
          <button className={cx('toggleButton', { active: !isUserCrops })} onClick={() => handleToggle(false)}>
            받은 농작물
          </button>
        </div>
        {isUserCrops ? (
          <div className={cx('myCropsContainer')}>
            {myCrops.length === 0 ? (
              <div className={cx('notCrop')}>
                <h3>아직 등록한 작물이 없습니다.</h3>
                {/* <GeneralButton
                  buttonStyle={{style:'primary', size:'medium'}} 
                  onClick={() => handleCropClick(someCropId)}>작물 등록 하러 가기</GeneralButton> */}
              </div>
            ) : (
              myCrops.map((myCrop) => (
                <div
                  key={myCrop.cropId}
                  className={cx('crop-image-container')}
                  onClick={() => handleCropClick(myCrop.cropId)}
                >
                  <div className={cx('crop-image')}>
                    <img
                      src={'http://' + myCrop.image}
                      alt={myCrop.nickname}
                    />
                  </div>
                  <div className={cx('crop-nickname')}>
                    <p>{myCrop.nickname}</p>
                  </div>                    
                </div>
              ))
            )}
          </div>
        ) : (
          <div className={cx('receivedCropsContainer')}>
            {receivedCrops.length === 0 ? (
              <div className={cx('notCrop')}>
                <h3>아직 물물 교환 / 나눔 받은 작물이 없습니다.</h3>
                {/* <GeneralButton
                  buttonStyle={{ style: 'primary', size: 'medium' }}
                  onClick={handleBarterClick}
                >
                  물물교환 하러 가기
                </GeneralButton> */}
              </div>
            ) : (
              receivedCrops.map((tradeCrop) => (
                <div
                  key={tradeCrop.cropId}
                  className={cx('crop-image-container')}
                  onClick={() => handleCropClick(tradeCrop.cropId)}
                >
                <div className={cx('crop-image')}>
                  <img
                    src={'http://' + tradeCrop.image}
                    alt={tradeCrop.nickname}
                    className={cx('crop-image')}
                  />
                </div>
                <div className={cx('crop-nickname')}>
                  <p>{tradeCrop.nickname}</p>
                </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropStoragePage;
