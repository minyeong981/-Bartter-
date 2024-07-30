import {createFileRoute} from '@tanstack/react-router';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {useState} from 'react';

import UserImage from '@/assets/image/유저.png';
import PostDetail from '@/components/Community/PostDetail/index.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton';
import type { Comment, CommunityPost } from '@/store/communityStore';
import useCommunityStore from '@/store/communityStore';

import styles from './../community.module.scss';


export const Route = createFileRoute('/_layout/community/detail/$postId')({
  // loader: ({ params }) => fetchPost(params.postId),
  component: Detail,
});

export default function Detail() {

const posts : CommunityPost[] = useCommunityStore(state => state.posts);
const post = posts[0]

  // 일단 detail 1개니까.
  const { postId } : number = Route.useParams()

  const [ content, setContent] = useState('댓글을 입력하세요');
  const addComment = useCommunityStore(state => state.addComment);

  // const post : CommunityPost = posts.filter((post) => post.communityPostId === postId)


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
    console.log(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && content.trim() !== '') {
      const newComment: Comment = {
        user: {
          userId: 99, 
          nickname: 'user99', 
          profileImage: UserImage
        },
        content,
        created_at: format( new Date(), 'yyyy-MM-dd HH:mm', {locale: ko})
      };

      addComment(postId, newComment)
      setContent(''); // 초기화
    }
  }

  return (
    <div>
      <HeaderWithBackButton />
      <PostDetail post={post} comments={post.commentList} />
      <div>
        <input
          className={styles.commentInput}
          type="text"
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="댓글을 입력하세요"
        />
      </div>
    </div>
  );
}