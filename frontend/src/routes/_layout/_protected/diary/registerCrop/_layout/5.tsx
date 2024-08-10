import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import Lottie from 'react-lottie-player';

import RegisterAnimation from '@/assets/lottie/register.json';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import barter from '@/services/barter';

import styles from '../registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/diary/registerCrop/_layout/5')({
  component: CropProfilePage,
  validateSearch: ({ cropId }) => {
    if (!cropId) {
      throw new Error('cropId가 필요합니다.');
    }
    return { cropId: cropId as number };
  },
});

function CropProfilePage() {
  const { cropId } = Route.useSearch();

  const { data } = useSuspenseQuery({
    queryKey: ['cropProfile', cropId],
    queryFn: () => barter.getCropProfile(cropId),
  });


  const { nickname, growDate, description, image} = data.data.data;

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>나만의 작물이 등록되었습니다.</Heading>
      </div>
      <Lottie loop animationData={RegisterAnimation} play className={cx('animation')} />
      <div className={cx('noteStyle')}>
        <div className={cx('leftSection')}>
          {image && <img src={image} alt={`${nickname}의 이미지`} className={cx('cropImage')} />}
          <div className={cx('nickname')}>{nickname}</div>
        </div>
        <div className={cx('rightSection')}>
          <div className={cx('date')}>🗓️ 처음 만난 날짜 <br /> : {growDate}</div>
          <div className={cx('description')}>{description}</div>
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary"
        >
          완료
        </LinkButton>
      </div>
    </>
  );
}

export default CropProfilePage;
