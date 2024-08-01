import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import MyCrops from '@/components/Crop/myCrops';
import useRootStore from '@/store';

import styles from './write.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/write/1')({
  component: DiaryWritePage,
});

function DiaryWritePage() {
  const crops = useRootStore(state => state.crops);
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<{ nickname: string; image: string } | null>(null);

  const handleCropSelect = (id: number) => {
    setSelectedCropId(id);
    const crop = crops.find(crop => crop.id === id);
    if (crop) {
      setSelectedCrop({ nickname: crop.nickname, image: crop.image });
    }
  };

  return (
    <div className={cx('DiaryWritePage')}>
      <h1>어떤 작물의 일지인가요?</h1>
      <MyCrops crops={crops} onCropClick={handleCropSelect} />
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary/write/2"
          disabled={selectedCropId === null}
          search={{selectedCropId: selectedCropId, selectedCrop:selectedCrop}}
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}

export default DiaryWritePage;
