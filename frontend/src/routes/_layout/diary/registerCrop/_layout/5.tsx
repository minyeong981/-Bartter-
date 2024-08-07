// import { useQuery } from '@tanstack/react-query';
// import { createFileRoute } from '@tanstack/react-router';
// import classnames from 'classnames/bind';
// import Lottie from 'react-lottie-player';

// import RegisterAnimation from '@/assets/lottie/register.json';
// import LinkButton from '@/components/Buttons/LinkButton.tsx';
// import Heading from '@/components/Heading';
// import Spinner from '@/components/Spinner';
// import barter from '@/services/barter';

// import styles from '../registerCrop.module.scss';

// const cx = classnames.bind(styles);

// export const Route = createFileRoute('/_layout/diary/registerCrop/_layout/5')({
//   component: CropProfilePage,
//   validateSearch: ({ cropId }) => {
//     if (!cropId) {
//       throw new Error('cropId가 필요합니다.');
//     }
//     return { cropId: cropId as number };
//   },
// });

// function CropProfilePage() {
//   const { cropId } = Route.useSearch();
  
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['cropProfile', cropId],
//     queryFn: () => barter.getCropProfile(cropId),
//     enabled: !!cropId, // cropId가 있을 때만 쿼리 실행
//   });

//   if (isLoading) return <Spinner />;
//   if (isError || !data) {
//     console.error('오류가 발생했습니다. 데이터:', data);
//     return <div>오류가 발생했습니다.</div>;
//   }

//   const { nickname, growDate, image, description } = data.data.data;

//   return (
//     <>
//       <div className={cx('headingContainer')}>
//         <Heading>나만의 작물이 등록되었습니다.</Heading>
//       </div>
//       <Lottie loop animationData={RegisterAnimation} play className={cx('animation')} />
//       <div className={cx('noteStyle')}>
//         <div className={cx('leftSection')}>
//           <img src={image} alt={`${nickname}의 이미지`} className={cx('cropImage')} />
//           <div className={cx('nickname')}>{nickname}</div>
//         </div>
//         <div className={cx('rightSection')}>
//           <div className={cx('date')}>처음 만난 날짜: {growDate}</div>
//           <div className={cx('description')}>{description}</div>
//         </div>
//       </div>
//       <div className={cx('buttonContainer')}>
//         <LinkButton
//           buttonStyle={{ style: 'primary', size: 'large' }}
//           to="/diary"
//         >
//           완료
//         </LinkButton>
//       </div>
//     </>
//   );
// }

// export default CropProfilePage;

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import RegisterAnimation from '@/assets/lottie/register.json';
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import Heading from '@/components/Heading';
import Spinner from '@/components/Spinner';
import barter from '@/services/barter';

import styles from '../registerCrop.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/registerCrop/_layout/5')({
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
  const [imageUrl, setImageUrl] = useState<File[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cropProfile', cropId],
    queryFn: () => barter.getCropProfile(cropId),
    enabled: !!cropId,
  });



  // useEffect(() => {
  //   if (data && data.data.data.image) {
  //     const image = data.data.data.image;
  //     if (image instanceof Blob) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImageUrl(reader.result as string);
  //       };
  //       reader.readAsDataURL(image);
  //     } else if (typeof image === 'string') {
  //       setImageUrl(image);
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    if (data && data.data.data.image) {
      setImageUrl(data.data.data.image);
    }
  }, [data]);
  
  if (isLoading) return <Spinner />;
  if (isError || !data) {
    console.error('오류가 발생했습니다. 데이터:', data);
    return <div>오류가 발생했습니다.</div>;
  }

  const { nickname, growDate, description } = data.data.data;

  return (
    <>
      <div className={cx('headingContainer')}>
        <Heading>나만의 작물이 등록되었습니다.</Heading>
      </div>
      <Lottie loop animationData={RegisterAnimation} play className={cx('animation')} />
      <div className={cx('noteStyle')}>
        <div className={cx('leftSection')}>
          {imageUrl && <img src={'http://' + imageUrl} alt={`${nickname}의 이미지`} className={cx('cropImage')} />}
          <div className={cx('nickname')}>{nickname}</div>
        </div>
        <div className={cx('rightSection')}>
          <div className={cx('date')}>처음 만난 날짜: {growDate}</div>
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
