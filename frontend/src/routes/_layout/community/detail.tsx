import {createFileRoute} from '@tanstack/react-router';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {useState} from 'react';

import CommunityImage from '@/assets/image/동네모임1.png';
import UserImage from '@/assets/image/유저.png';
import type {Comment} from '@/components/Community/PostDetail';
import PostDetail from '@/components/Community/PostDetail/index.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton';

import styles from './community.module.scss';

const post = {
  communityPostId: 1,
  user: {userId: 0, nickname: 'user0', profileImage: UserImage},
  location: '광주 장덕동',
  title: '게시글 제목',
  content: '게시글 내용입니다.',
  likeCount: 12,
  commentList: [
    {
      user: {userId: 1, nickname: 'user1', profileImage: UserImage},
      content: '댓글1',
      created_at: '2024-07-03',
    },
    {
      user: {userId: 1, nickname: 'user2', profileImage: UserImage},
      content: '댓글2',
      created_at: '2024-07-03',
    },
  ],
  imageList: [
    {imageId: 1, imageUrl: CommunityImage, imageOrder: 1},
    {
      imageId: 2,
      imageUrl: CommunityImage,
      imageOrder: 2,
    },
  ],
  created_at: '2024-05-20',
};

export const Route = createFileRoute('/_layout/community/detail')({
  component: Detail,
});

export default function Detail() {
  const [comments, setComments] = useState(post.commentList);

  const [inputValue, setInputValue] = useState('댓글을 입력하세요');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
    console.log(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      const newComment: Comment = {
        user: {userId: 99, nickname: 'user99', profileImage: UserImage},
        content: inputValue,
        created_at: '2024-07-10',
      };

      setComments([...comments, newComment]);
      setInputValue(''); // 초기화
    }
    console.log(comments);
  }

  return (
    <div>
      <HeaderWithBackButton />
      <PostDetail post={post} comments={comments} />
      <div>
        <input
          className={styles.commentInput}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="댓글을 입력하세요"
        />
      </div>
    </div>
  );
}