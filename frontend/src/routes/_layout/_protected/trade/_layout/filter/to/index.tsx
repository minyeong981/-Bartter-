import {useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import CropButton from '@/components/Buttons/CropButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';
import barter from '@/services/barter.ts';

import styles from './to.module.scss';

export interface SearchParamsTo {
  to?: CropCategoryDetail[];
}

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/_protected/trade/_layout/filter/to/',
)({
  component: ToPage,
});

function ToPage() {
  const {data} = useQuery({
    queryKey: ['cropsCategory', 'filter', 'to'],
    queryFn: barter.getCropCategoryList,
  });
  const [cropsToGet, setCropsToGet] = useState<CropCategoryDetail[]>([]);

  function handleSelectCrop(crop: CropCategoryDetail) {
    if (cropsToGet.includes(crop)) {
      setCropsToGet(prevCrops =>
        prevCrops.filter(prevCrop => prevCrop !== crop),
      );
    } else {
      setCropsToGet(prevCrops => [...prevCrops, crop]);
    }
  }

  return (
    <div className={cx('toPage')}>
      <HeaderWithLabelAndBackButton
        label="받고 싶은 농작물"
        style={{position: 'static', width: '100%'}}
      />
      <div className={cx('cropListContainer')}>
        <div className={cx('cropList')}>
          {data?.data.data &&
            data?.data.data.map((crop, index) => (
              <CropButton
                key={`${index}-${crop.name}`}
                onClick={handleSelectCrop}
                value={crop}
                name={crop.name}
                imgUrl={crop.image}
                selected={cropsToGet.includes(crop)}
              />
            ))}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/trade"
          search={prev => ({
            ...prev,
            to: cropsToGet,
          })}
        >
          선택
        </LinkButton>
      </div>
    </div>
  );
}