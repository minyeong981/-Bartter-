import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton';
import MyCrops from '@/components/Crop/myCrops'; 
import Search from '@/components/Search/Search';

import styles from './write.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/write/1')({
  component: DiaryWritePage,
});

function DiaryWritePage() {
  return (
    <div>
      <h1>어떤 작물의 일지인가요?</h1>
      <Search onSearch={(term) => console.log(term)} />
      <MyCrops />
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary/write/2"
        >
          다음
        </GeneralButton>
      </div>
    </div>
  );
}

export default DiaryWritePage;
