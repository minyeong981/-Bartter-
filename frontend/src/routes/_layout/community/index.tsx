import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';

import CommunityImage from '@/assets/image/동네모임1.png';
import PostList from '@/components/Community/PostList';
import TwoButton from '@/components/TwoButton/TwoButton';

const allPosts = [
  {
    location: '서울 강남구',
    title: '동네 마라톤 대회',
    content: '함께 달려요! 초보자도 환영합니다.',
    date: '2024-07-25 오후 5:00',
    imageSrc: [CommunityImage, CommunityImage],
    likeCount: 1,
    commentCount: 2,
  },
  {
    location: '서울 강남구',
    title: '동네 마라톤 대회',
    content: '함께 달려요! 초보자도 환영합니다.',
    date: '2024-07-25 오후 5:00',
    imageSrc: [CommunityImage],
    likeCount: 1,
    commentCount: 2,
  },
];

const neighborPosts = [
  {
    location: '광주 장덕동',
    title: '동네 마라톤 대회',
    content: '함께 달려요! 초보자도 환영합니다.',
    date: '2024-07-25 오후 5:00',
    imageSrc: [CommunityImage],
    likeCount: 1,
    commentCount: 2,
  },
  {
    location: '광주 수완동',
    title: '동네 마라톤 대회',
    content: '함께 달려요! 초보자도 환영합니다.',
    date: '2024-07-25 오후 5:00',
    imageSrc: [CommunityImage],
    likeCount: 1,
    commentCount: 2,
  },
];

export default function Community() {
  const [activeComponent, setActiveComponent] = useState<string>('전체글');

  const renderComponent = () => {
    switch (activeComponent) {
      case '전체글':
        return <PostList postCards={allPosts} />;
      case '동네글':
        return <PostList postCards={neighborPosts} />;
      default:
        return null;
    }
  };

  const handleButtonClick = (button: string) => {
    setActiveComponent(button);
  };

  return (
    <div>
      <TwoButton
        first="전체글"
        second="동네글"
        activeButton={activeComponent}
        onClick={handleButtonClick}
      />
      <div>{renderComponent()}</div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/community/')({
  component: Community,
});