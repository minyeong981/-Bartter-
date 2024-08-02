import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import {
  ImageApple,
  ImageCarrot,
  ImageCorn,
  ImageCucumber,
  ImageEggPlant,
  ImageGarlic,
  ImageGrape,
} from '@/assets/image';
import CropButton from '@/components/Buttons/CropButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';

import styles from './to.module.scss';

const DUMMY_CROPS = [
  {imageUrl: ImageCorn, value: 'corn'},
  {imageUrl: ImageCucumber, value: 'cucumber'},
  {
    imageUrl: ImageApple,
    value: 'apple',
  },
  {imageUrl: ImageCarrot, value: 'carrot'},
  {imageUrl: ImageGrape, value: 'grape'},
  {imageUrl: ImageGarlic, value: 'garlic'},
  {imageUrl: ImageEggPlant, value: 'eggplant'},
];

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/trade/to/_layout/')({
  component: ToPage,
});

function ToPage() {
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
          {DUMMY_CROPS.length &&
            DUMMY_CROPS.map((crop, index) => (
              <CropButton
                key={`${index}-${crop.value}`}
                onClick={handleSelectCrop}
                value={crop.value}
                imgUrl={crop.imageUrl}
                selected={cropsToGet.includes(crop.value)}
              />
            ))}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/signup"
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}