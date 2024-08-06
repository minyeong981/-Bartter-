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

export const Route = createFileRoute('/_layout/trade/from/_layout/')({
  component: FromPage,
});

function FromPage() {
  const {data} = useQuery({
    queryKey: ['cropsCategory'],
    queryFn: barter.getCropCategoryList,
  });
  const [cropsToGive, setCropsToGive] = useState<string[]>([]);

  console.log(data?.data.data);

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
                value={crop.name}
                imgUrl={crop.image!}
                selected={cropsToGive.includes(crop.name)}
              />
            ))}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/trade/to"
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}