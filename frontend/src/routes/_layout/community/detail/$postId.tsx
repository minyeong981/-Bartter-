import {createFileRoute, useParams } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {useEffect,useState} from 'react';

import UserImage from '@/assets/image/유저.png';
import PostDetail from '@/components/Community/PostDetail/index.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton';
import useRootStore from '@/store';
import type {Comment, CommunityPost} from '@/store/communitySlice.ts';

import styles from './../community.module.scss';

export const Route = createFileRoute('/_layout/community/detail/$postId')({
  // loader: async({ params }) => fetchPost(params.postId),
  component: Detail,
});

export default function Detail() {
  const posts : CommunityPost[] = useRootStore(state => state.posts);
  // 일단 detail 1개니까.
  const postId  = 1;
  const post = posts[0];
  // const { postId } : number = Route.useParams()
  const addComment = useRootStore(state => state.addComment);

  // const [post, setPost] = useState<CommunityPost | undefined>(undefined);
  // useEffect(() => {
  //   const foundPost = posts.find(post => post.communityPostId === Number(postId));
  //   setPost(foundPost);
  // }, [postId, posts]);


  const [ content, setContent] = useState('댓글을 입력하세요');

  // const post : CommunityPost = posts.filter((post) => post.communityPostId === postId)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
    console.log(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && content.trim() !== '') {
      const newComment: {newComment : Comment} = {
        user : {
          userId: 99, 
          nickname: 'user99', 
          profileImage: UserImage
        },
        content,
        created_at: format(new Date(), 'yyyy-MM-dd HH:mm', {locale: ko}),
      };

      addComment(postId, newComment);
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