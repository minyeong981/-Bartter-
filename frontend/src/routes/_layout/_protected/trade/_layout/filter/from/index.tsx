import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import CropButton from '@/components/Buttons/CropButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton.tsx';
import barter from '@/services/barter.ts';

import styles from './from.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamsFrom {
  from?: CropCategoryDetail;
}

export const Route = createFileRoute(
  '/_layout/_protected/trade/_layout/filter/from/',
)({
  component: FromPage,
});

function FromPage() {
  const {data} = useSuspenseQuery({
    queryKey: ['cropsCategory', 'filter', 'from'],
    queryFn: barter.getCropCategoryList,
  });
  const [cropToGive, setCropToGive] = useState<CropCategoryDetail>();

  function handleSelectCrop(crop: CropCategoryDetail) {
    setCropToGive(prev => (prev === crop ? undefined : crop));
  }

  return (
    <>
      <HeaderWithLabelAndBackButton
        label="주고 싶은 농작물"
        style={{position: 'static', width: '100%'}}
      />      
      <div className={cx('fromPage')}>
        <div className={cx('cropListContainer')}>
          <div className={cx('cropList')}>
            {data.data.data.length &&
              data.data.data.map((crop, index) => (
                <CropButton
                  key={`${index}-${crop.cropCategoryId}`}
                  onClick={handleSelectCrop}
                  value={crop}
                  name={crop.name}
                  imgUrl={crop.image}
                  selected={cropToGive === crop}
                />
              ))}
          </div>
        </div>
        <div className={cx('buttonContainer')}>
          <LinkButton
            buttonStyle={{style: 'primary', size: 'large'}}
            to="/trade"
            search={prev => ({...prev, from: cropToGive})}
          >
            선택
          </LinkButton>
        </div>
      </div>    
    </>

  );
}