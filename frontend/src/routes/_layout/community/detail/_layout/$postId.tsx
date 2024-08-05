import {createFileRoute} from '@tanstack/react-router';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {useEffect,useState} from 'react';

import PostDetail from '@/components/Community/PostDetail/index.tsx';
// import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton';
import LikeComment from '@/components/LikeComment';
import UserNameContent from '@/components/User/UserNameContent';
import UserNameLocation from '@/components/User/UserNameLocation';
import useRootStore from '@/store';

import styles from './../detail.module.scss';

export const Route = createFileRoute('/_layout/community/detail/_layout/$postId')({
  // loader: async({ params }) => fetchPost(params.postId),
  component: CommunityPostDetail
});

export default function CommunityPostDetail() {
  const {postId}: {postId: number} = Route.useParams();
  const posts: CommunityPost[] = useRootStore(state => state.posts);

  const deletePost = useRootStore(state => state.deletePost)
  const addComment = useRootStore(state => state.addComment);
  const deleteComment = useRootStore(state => state.deleteComment)

  const [post, setPost] = useState<CommunityPost | undefined>(undefined);

  useEffect(() => {
    const foundPost = posts.find(post => post.communityPostId === Number(postId));
    setPost(foundPost);

  }, [postId, posts]);

  const [content, setContent] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && content.trim() !== '') {
      addComment(Number(postId), content);
      setContent(''); // 초기화
    }
  }

  function handleDeletePost(postId: number) {
    deletePost(Number(postId))
  }

  function handleDeleteComment(commentId:number) {
    deleteComment(Number(postId), commentId)
    console.log(postId, commentId)
    setPost(prevPost => {
      if (!prevPost) return prevPost;

      return {
        ...prevPost, 
        commentList: prevPost.commentList.filter(comment => comment.commentId !== commentId)
      };
    });
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* <HeaderWithBackButton /> */}
      <UserNameLocation
        locationName={post.location.locationName}
        postId={post.communityPostId}
        createdAt={post.createdAt}
        nickname={post.user.nickname}
        profileImage={post.user.profileImage}
        onDelete={() => handleDeletePost(post.communityPostId)}
      />
      <PostDetail post={post} />
      <LikeComment
        likeCount={post.likeCount}
        commentCount={post.commentList.length}
        isLike={true}
      />
      { post.commentList.map((comment, commentIndex) => (
        <UserNameContent key={commentIndex} comment={comment} onDelete={() => handleDeleteComment(comment.commentId)} />
      ))}
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