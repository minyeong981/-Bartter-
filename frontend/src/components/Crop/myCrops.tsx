import classnames from 'classnames/bind';

import styles from './myCrops.module.scss';

const cx = classnames.bind(styles);

interface Crop {
  id: number;
  nickname: string;
  image: string;
}

interface MyCropsProps {
  crops: Crop[];
}

function MyCrops({crops}: MyCropsProps) {
  return (
    <div className={cx('crops-container')}>
      <h3 className={cx('crops-count')}>전체 작물 수 : {crops.length}</h3>
      <div className={cx('crop-list')}>
        {crops.map(crop => (
          <div key={crop.id} className={cx('crop-card')}>
            <div className={cx('crop-image-container')}>
              <img
                src={crop.image}
                alt={crop.nickname}
                className={cx('crop-image')}
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