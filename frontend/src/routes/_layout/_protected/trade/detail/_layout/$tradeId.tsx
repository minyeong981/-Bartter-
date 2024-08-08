import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {
  ImageApple,
  ImageCarrot,
  ImageCorn,
  ImageCucumber,
  ImageEggPlant,
  ImageGarlic,
  ImageGrape,
} from '@/assets/image';
import CropButton from '@/components/Buttons/CropButton';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import Carousel from '@/components/Carousel';
import UserNameLocation from '@/components/User/UserNameLocation.tsx';

import styles from './detail.module.scss';

const DUMMY_IMAGES = [
  'https://img1.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
  'https://image.dongascience.com/Photo/2019/09/1568191092998.jpg',
  'https://cdn.sisain.co.kr/news/photo/202405/53124_99734_5711.jpg',
  'https://flexible.img.hani.co.kr/flexible/normal/970/644/imgdb/resize/2019/0404/00503871_20190404.JPG',
];

const DUMMY_CROPS = [
  {imageUrl: ImageCorn, value: 'corn'},
  {imageUrl: ImageCucumber, value: 'cucumber'},
  {
    imageUrl: ImageApple,
    value: 'apple',
  },
  {imageUrl: ImageCarrot, value: 'carrot'},
  {imageUrl: ImageGrape, value: 'grape'},
  {imageUrl: ImageGarlic, value: 'garlic'},
  {imageUrl: ImageEggPlant, value: 'eggplant'},
];

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/trade/detail/_layout/$tradeId')({
  component: TradeDetailPage,
});

function TradeDetailPage() {
  const {tradeId} = Route.useParams();
  return (
    <div className={cx('detailPage')}>
      <Carousel images={DUMMY_IMAGES} />
      <UserNameLocation
        postId={Number(tradeId)}
        locationName="장덕동"
        nickname="보보"
        createdAt={Date().toString()}
        profileImage="https://cdn.sisain.co.kr/news/photo/202405/53124_99734_5711.jpg"
      />
      <div className={cx('detail')}>
        <h1 className={cx('title', 'padding')}>제목</h1>
        <p className={cx('content', 'padding')}>내용</p>
        <GeneralButton buttonStyle={{style: 'primary', size: 'large'}}>
          {}의 성장일기 보러가기 🗓
        </GeneralButton>
        <div className={cx('cropList', 'padding')}>
          <p>받고싶은 작물 목록</p>
          <div className={cx('crops')}>
            {DUMMY_CROPS.length &&
              DUMMY_CROPS.map((crop, index) => (
                <CropButton
                  key={`${index}=${crop.value}`}
                  onClick={() => null}
                  value={crop.value}
                  imgUrl={crop.imageUrl}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}