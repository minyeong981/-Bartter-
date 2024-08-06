import {useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import CropButton from '@/components/Buttons/CropButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import barter from '@/services/barter.ts';

import styles from './from.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamsFromFromPage {
  cropsToGive: string[];
}

export const Route = createFileRoute('/_layout/trade/from/_layout/')({
  component: FromPage,
});

function FromPage() {
  const {data} = useQuery({
    queryKey: ['cropsCategory'],
    queryFn: barter.getCropCategoryList,
  });
  const [cropsToGive, setCropsToGive] = useState<string[]>([]);

  function handleSelectCrop(crop: string) {
    if (cropsToGive.includes(crop)) {
      setCropsToGive(prevCrops =>
        prevCrops.filter(prevCrop => prevCrop !== crop),
      );
    } else {
      setCropsToGive(prevCrops => [...prevCrops, crop]);
    }
  }

  return (
    <div className={cx('fromPage')}>
      <Heading>
        주고 싶은 농작물을
        <br />
        선택하세요
      </Heading>
      <div className={cx('cropListContainer')}>
        <div className={cx('cropList')}>
          {data?.data.data &&
            data?.data.data.map((crop, index) => (
              <CropButton
                key={`${index}-${crop.name}`}
                onClick={handleSelectCrop}
                value={String(crop.cropCategoryId)}
                name={crop.name}
                imgUrl={crop.image!}
                selected={cropsToGive.includes(String(crop.cropCategoryId))}
              />
            ))}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/trade/to"
          search={{cropsToGive: cropsToGive}}
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}