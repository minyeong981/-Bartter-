import {useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import CropButton from '@/components/Buttons/CropButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import type {SearchParamsFromFromPage} from '@/routes/_layout/trade/from/_layout/index.tsx';
import barter from '@/services/barter.ts';

import styles from './to.module.scss';

export interface SearchParamsFromToPage extends SearchParamsFromFromPage {
  cropsToGet: string[];
}

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/trade/to/_layout/')({
  component: ToPage,
  validateSearch: ({
    cropsToGive,
  }: Record<string, unknown>): SearchParamsFromFromPage => {
    return {
      cropsToGive: cropsToGive as string[],
    };
  },
});

function ToPage() {
  const {data} = useQuery({
    queryKey: ['cropsCategory'],
    queryFn: barter.getCropCategoryList,
  });
  const [cropsToGet, setCropsToGet] = useState<string[]>([]);

  function handleSelectCrop(crop: string) {
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
      <Heading>
        받고 싶은 농작물을
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
                selected={cropsToGet.includes(String(crop.cropCategoryId))}
              />
            ))}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/trade/write"
          search={prev => ({...prev, cropsToGet: cropsToGet})}
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}