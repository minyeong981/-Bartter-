import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import SweatPotato from '@/assets/image/고구마.png';
import CommunityImage from '@/assets/image/동네모임1.png';
import StroyImage from '@/assets/image/스토리1.png';
import UserImage from '@/assets/image/유저.png';
import AdCarousel from '@/components/AdCarousel';
import BarterCard from '@/components/BarterCard';
import LinkButton from '@/components/Buttons/LinkButton';
import PostList from '@/components/Community/PostList';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons';
import HomeStory from '@/components/Story/HomeStory';

import styles from './home.module.scss';

const barters = [
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
];

const posts = [
  {
    comunityPostId: 1,
    locationName: '서울 강남구',
    title: '동네 마라톤 대회1',
    content: '함께 달려요! 초보자도 환영합니다.',
    likeCount: 12,
    commentCount: 3,
    image: CommunityImage,
    createdAt: '2024-07-25 오후 5:00',
  },
  {
    comunityPostId: 2,
    locationName: '서울 마포구',
    title: '동네 마라톤 대회2',
    content: '함께 달려요! 초보자도 환영합니다.',
    likeCount: 12,
    commentCount: 3,
    image: CommunityImage,
    createdAt: '2024-07-25 오후 5:00',
  },
  {
    comunityPostId: 3,
    locationName: '광주 장덕동',
    title: '동네 마라톤 대회3',
    content: '함께 달려요! 초보자도 환영합니다.',
    likeCount: 12,
    commentCount: 3,
    image: CommunityImage,
    createdAt: '2024-07-25 오후 5:00',
  },
];

const storyData = [
  {
    diaryImageSrc: StroyImage,
    profileImageSrc: UserImage,
    userName: 'user1',
  },
  {
    diaryImageSrc: StroyImage,
    profileImageSrc: UserImage,
    userName: 'user1',
  },
  {
    diaryImageSrc: StroyImage,
    profileImageSrc: UserImage,
    userName: 'user1',
  },
  {
    diaryImageSrc: StroyImage,
    profileImageSrc: UserImage,
    userName: 'user1',
  },
];

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/home/')({
  component: () => (
    <div className={cx('container')}>
      <HeaderWithLabelAndButtons label="내위치" />
      <AdCarousel />
      <div className={cx('home-barter')}>
        <div className={cx('section-title')}>
          <div>물물 교환</div>
        </div>
        <BarterCard barterCards={barters} />
      </div>

      <div className={cx('link-button-container')}>
        <LinkButton buttonStyle={{style: 'primary', size: 'medium'}}>
          물물 교환 더보기
        </LinkButton>
      </div>

      <div className={cx('home-community')}>
        <div className={cx('section-title')}>
          <div>동네 모임</div>
        </div>
        <PostList posts={posts} />
      </div>
      <div className={cx('link-button-container')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'medium'}}
          to="/community"
        >
          동네 모임 더보기
        </LinkButton>
      </div>
      <div className={cx('home-story')}>
        <div className={cx('section-title')}>
          <div>이웃의 농사 일지</div>
          <HomeStory followCards={storyData} />
        </div>
      </div>
    </div>
  ),
});