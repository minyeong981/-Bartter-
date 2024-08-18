import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import UserCrops from '@/components/Crop/UserCrops';
import Heading from '@/components/Heading';
import useRootStore from '@/store';

import styles from '../write.module.scss';

export interface SearchParamDate {
  selectedDate?: string;
  cropId?: number;
}

const cx = classnames.bind(styles);


export const Route = createFileRoute('/_layout/_protected/diary/write/_layout/1')({
  component: DiaryWritePage,
  validateSearch: (search: Record<string, unknown>): SearchParamDate => {
    return {
      selectedDate: search.selectedDate !== 'undefined' ? (search.selectedDate as string) : undefined,
    };
  },
});

function DiaryWritePage() {
  const userId = useRootStore(state => state.userId);
  const [cropId, setCropId] = useState<number | undefined>(undefined);

  const handleSelectCrop = (cropId: number) => {
    setCropId(cropId);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
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
            search={prev => ({...prev, cropId })}
          >
            다음
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export default DiaryWritePage;

