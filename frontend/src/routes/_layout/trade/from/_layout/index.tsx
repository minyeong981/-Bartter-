import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import CropButton from '@/components/Buttons/CropButton';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';

import styles from './from.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamsFromFromPage {
  cropToGive?: string;
}

export const Route = createFileRoute('/_layout/trade/from/_layout/')({
  component: FromPage,
});

function FromPage() {
  const {userId} = useRootStore(state => state);
  const {data} = useSuspenseQuery({
    queryKey: ['cropProfile', userId],
    queryFn: () => barter.getCropProfileListByUser(userId),
  });
  const [cropToGive, setCropToGive] = useState<string>('');

  function handleSelectCrop(cropId: string) {
    setCropToGive(prev => (prev === cropId ? '' : cropId));
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
          {data.data.data.length &&
            data.data.data.map((crop, index) => (
              <CropButton
                key={`${index}-${crop.cropId}`}
                onClick={handleSelectCrop}
                value={String(crop.cropId)}
                name={crop.nickname}
                imgUrl={crop.image}
                selected={cropToGive === String(crop.cropId)}
              />
            ))}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/trade/to"
          search={{cropToGive: cropToGive}}
          disabled={!cropToGive}
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}