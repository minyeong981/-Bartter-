import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import useDiaryStore from '@/store/diaryStore';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/5')({
  component: cropProfilePage,
});

function cropProfilePage() {
  const { setActiveComponent } = useDiaryStore();

  const handleRegisterComplete = () => {
    setActiveComponent('내 작물');
  };

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>작물 별명!</Heading>
      </div>
      <div className={cx('inputContainer')}>
        이미지
        설명
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary"
          onClick={handleRegisterComplete}
        >
          등록 완료
        </LinkButton>
      </div>
    </>
  );
}

export default cropProfilePage;
