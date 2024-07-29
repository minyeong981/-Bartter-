import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';

import CommunityImage from '@/assets/image/동네모임1.png';
import GeneralButton from '@/components/Buttons/LinkButton';
import PostList from '@/components/Community/PostList';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons';
import TwoButton from '@/components/TwoButton/TwoButton';

import styles from './community.module.scss';

const allPosts = [
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

const neighborPosts = [
  {
    comunityPostId: 4,
    locationName: '광주 장덕동',
    title: '동네 마라톤 대회4',
    content: '함께 달려요! 초보자도 환영합니다.',
    likeCount: 12,
    commentCount: 3,
    image: CommunityImage,
    createdAt: '2024-07-25 오후 5:00',
  },
];

export const Route = createFileRoute('/_layout/community/')({
  component: Community,
});

export default function Community() {
  const [activeComponent, setActiveComponent] = useState<string>('전체글');

  const renderComponent = () => {
    switch (activeComponent) {
      case '전체글':
        return <PostList posts={allPosts} />;
      case '동네글':
        return <PostList posts={neighborPosts} />;
      default:
        return null;
    }
  };

  const handleButtonClick = (button: string) => {
    setActiveComponent(button);
  };

  return (
    <div>
      <HeaderWithLabelAndButtons label="내위치" />
      <TwoButton
        first="전체글"
        second="동네글"
        activeButton={activeComponent}
        onClick={handleButtonClick}
      />
      <div>{renderComponent()}</div>
      <div className={styles.floatingButton}>
        <GeneralButton
          buttonStyle={{style: 'floating', size: 'small'}}
          to="/community/create"
        >
          + 글 작성하기
        </GeneralButton>
      </div>
    </div>
  );
}