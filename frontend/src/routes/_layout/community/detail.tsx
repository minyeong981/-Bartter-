import {createFileRoute} from '@tanstack/react-router';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {useState} from 'react';

import UserImage from '@/assets/image/유저.png';
import PostDetail from '@/components/Community/PostDetail/index.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton';
import type { Comment } from '@/store/communityStore';
import useCommunityStore from '@/store/communityStore';

import styles from './community.module.scss';


export const Route = createFileRoute('/_layout/community/detail')({
  component: Detail,
});

export default function Detail() {

const posts = useCommunityStore(state => state.posts);
const post = posts[0]

  // 일단 detail 1개니까.
  const [comments, setComments] = useState(posts[0].commentList);

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