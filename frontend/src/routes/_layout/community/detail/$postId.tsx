import {createFileRoute} from '@tanstack/react-router';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {useState} from 'react';

import UserImage from '@/assets/image/유저.png';
import CommentList from '@/components/Community/CommentLIst';
import PostDetail from '@/components/Community/PostDetail/index.tsx';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton';
import LikeComment from '@/components/LikeComment';
import UserNameLocation from '@/components/User/UserNameLocation';
import useRootStore from '@/store';

import styles from './../index.module.scss';

export const Route = createFileRoute('/_layout/community/detail/$postId')({
  // loader: async({ params }) => fetchPost(params.postId),
  component: CommunityDetail,
});

export default function CommunityDetail() {
  const posts: CommunityPost[] = useRootStore(state => state.posts);
  // 일단 detail 1개니까.
  const postId = 1;
  const post = posts[0];
  // const { postId } : number = Route.useParams()
  const addComment = useRootStore(state => state.addComment);

  // const [post, setPost] = useState<CommunityPost | undefined>(undefined);
  // useEffect(() => {
  //   const foundPost = posts.find(post => post.communityPostId === Number(postId));
  //   setPost(foundPost);
  // }, [postId, posts]);

  const [content, setContent] = useState('댓글을 입력하세요');

  // const post : CommunityPost = posts.filter((post) => post.communityPostId === postId)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
    console.log(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && content.trim() !== '') {
      const newComment: PostComment = {
        commentId: 1,
        user: {
          userId: '99',
          nickname: 'user99',
          profileImage: UserImage,
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
      <UserNameLocation
        locationName={post.location.locationName}
        postId={post.communityPostId}
        createdAt={post.createdAt}
        nickname={post.user.nickname}
        profileImage={post.user.profileImage}
      />
      <PostDetail post={post} />
      <LikeComment
        likeCount={post.likeCount}
        commentCount={post.commentList.length}
        isLike={true}
      />
      <CommentList Comments={post.commentList} />
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