import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import Heading from '@/components/Heading';
import useDiaryStore from '@/store/diaryStore';
import useMyCropsStore from '@/store/myCropsStore';
import useRegisterCropStore from '@/store/registerCropStore';

import styles from './registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/5')({
  component: CropProfilePage,
});

function CropProfilePage() {
  const nickname = useRegisterCropStore(state => state.nickname);
  const date = useRegisterCropStore(state => state.date);
  const description = useRegisterCropStore(state => state.description);
  const image = useRegisterCropStore(state => state.image);
  const initialImage = useRegisterCropStore(state => state.initialImage);
  const addCrop = useMyCropsStore(state => state.addCrop);

  console.log('Nickname:', nickname);
  console.log('Date:', date);
  console.log('Description:', description);
  console.log('Image:', image);
  console.log('Initial Image:', initialImage);

  const navigate = useNavigate();
  const { setActiveComponent } = useDiaryStore();

  const handleRegisterComplete = () => {
    const finalImage = image || initialImage;
    const cropData = {
      nickname,
      image: finalImage,
      date,
      description,
    };

    addCrop(cropData);
    console.log('Registering crop:', cropData);

    setActiveComponent('내 작물');
    navigate({
      to: '/diary',
      replace: true,
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
