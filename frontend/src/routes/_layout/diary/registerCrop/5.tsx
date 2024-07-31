import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import Heading from '@/components/Heading';
import useRootStore from '@/store';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/5')({
  component: CropProfilePage,
});

function CropProfilePage() {
  const { nickname, date, description, image, initialImage, addCrop, setActiveComponent, resetCropForm } = useRootStore(state => ({
    nickname: state.nickname,
    date: state.date,
    description: state.description,
    image: state.image,
    initialImage: state.initialImage,
    addCrop: state.addCrop,
    setActiveComponent: state.setActiveComponent,
    resetCropForm: state.resetCropForm,
  }));

  const navigate = useNavigate();

  const handleRegisterComplete = () => {
    addCrop({
      id: Date.now(), // 임의의 ID 할당, 필요시 다른 방식으로 변경
      nickname,
      image: image || initialImage,
      date,
      description,
    });
    setActiveComponent('내 작물');
    navigate({
      to: '/diary',
      replace: true,
    }).then(() => {
      resetCropForm(); // 데이터 리셋
    });
  };

  const displayImage = image || initialImage;

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>{nickname}</Heading>
      </div>
      <div className={cx('inputContainer')}>
        <div>
          {displayImage && <img src={displayImage} alt={`${nickname}의 이미지`} />}
        </div>
        <div>
          처음 만난 날짜 : {date}
        </div>
        <div>
          {description}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          onClick={handleRegisterComplete}
        >
          등록 완료
        </GeneralButton>
      </div>
    </>
  );
}

export default CropProfilePage;
