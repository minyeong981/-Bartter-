import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import UserCrops from '@/components/Crop/UserCrops';
import Heading from '@/components/Heading';
import useRootStore from '@/store';

import styles from '../write.module.scss';

const cx = classnames.bind(styles);

export interface SearchParamCropId {
  cropId: number;
}

export const Route = createFileRoute('/_layout/_protected/diary/write/_layout/1')({
  component: DiaryWritePage,
});

function DiaryWritePage() {
  const userId = useRootStore(state => state.userId);
  const [cropId, setCropId] = useState<number | undefined>(undefined);

  const handleSelectCrop = (cropId: number) => {
    setCropId(cropId);
  };

  return (
    <div>
      <div className={cx('DiaryWritePage')}>
        <div className={cx('headingContainer')}>
          <Heading>어떤 작물의 일지인가요?</Heading>
        </div>
        <div className={cx('cropsitem')}>
        <UserCrops userId={userId} onSelectCrop={handleSelectCrop} />
        </div>
        <div className={cx('buttonContainer')}>
          <LinkButton
            buttonStyle={{ style: 'primary', size: 'large' }}
            to="/diary/write/2"
            disabled={cropId === undefined}
            search={{ cropId }}
          >
            다음
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export default DiaryWritePage;

