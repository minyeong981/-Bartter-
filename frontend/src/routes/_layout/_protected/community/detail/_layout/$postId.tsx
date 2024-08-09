import { useMutation, useQueryClient,useSuspenseQuery } from '@tanstack/react-query';
import {createFileRoute, useNavigate } from '@tanstack/react-router';
import type {ChangeEvent, KeyboardEvent} from 'react';
import {useState} from 'react';

import PostDetail from '@/components/Community/PostDetail/index.tsx';
import LikeComment from '@/components/LikeComment';
import UserNameContent from '@/components/User/UserNameContent';
import UserNameLocation from '@/components/User/UserNameLocation';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../detail.module.scss';

export const Route = createFileRoute('/_layout/_protected/community/detail/_layout/$postId')({
  component: CommunityPostDetail
});

export default function CommunityPostDetail() {
  const queryClient = useQueryClient();
  const {postId}: {postId: CommunityPostId} = Route.useParams();
  const [content, setContent] = useState(''); // 댓글

  const navigate = useNavigate({from: '/community/detail/$postId'})

  const { data } = useSuspenseQuery({
    queryKey: [ querykeys.COMMUNITY_DETAIL, postId],
    queryFn: () => barter.getCommunityPost(postId),
    // enabled: !!postId
  })

  const deletePost = useMutation({
    mutationFn: ( postId : CommunityPostId ) => {
      return barter.deleteCommunityPost(postId)
    },
    onError: ()=> {
      console.log('게시글 삭제 실패')
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : [querykeys.COMMUNITY_DETAIL]});
      navigate({to: '/community'})
    }
  })

  const addComment = useMutation({
    mutationFn: ({communityPostId, content} : { communityPostId:CommunityPostId; content: string }) =>  {
      return barter.postCommunityComment(communityPostId, content)
    },
    onError: (error) => {
      console.log('댓글 작성 실패', error)
    },
    onSuccess: () => {
      console.log('댓글 생성 성공')
      setContent(''); // 초기화
      queryClient.invalidateQueries({queryKey : [querykeys.COMMUNITY_DETAIL]});
    }
  })

  const deleteComment = useMutation({
    mutationFn: ({postId, commentId} : {postId:CommunityPostId; commentId : CommunityPostCommentId }) => {
      return barter.deleteCommunityComment(postId, commentId)
    },
    onError: () => {
      console.log('댓글 삭제 실패')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : [querykeys.COMMUNITY_DETAIL]});
    }
  })

  const clickIsLikeTrue = useMutation({
    mutationFn : ( postId : CommunityPostId ) => {
      return barter.likeCommunityPost(postId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : [querykeys.COMMUNITY_DETAIL]});
    }
  })

    const clickIsLikeFalse = useMutation({
    mutationFn : ( postId : CommunityPostId ) => {
      return barter.unLikeCommunityPost(postId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : [querykeys.COMMUNITY_DETAIL]});
    }
  })
    

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && content.trim() !== '') {
      addComment.mutate({ communityPostId: Number(postId), content })
    }
  }

  function handleDeletePost(postId: number) {
    deletePost.mutate(postId)
  }

  function handleDeleteComment(commentId:number) {
    deleteComment.mutate({postId:Number(postId), commentId:commentId})
  }

  function ChangeIsLike() {
    if ( data?.data.data.isLike ) {
      clickIsLikeFalse.mutate(postId)
    } else {
      clickIsLikeTrue.mutate(postId)
    }

  }

  const post = data.data.data

  return (
    <div>
      <UserNameLocation
        locationName={post.location.name}
        postId={post.communityPostId}
        createdAt={post.createdAt}
        userId={post.author.userId}
        nickname={post.author.nickname}
        profileImage={post.author.profileImage}
        onDelete={() => handleDeletePost(post.communityPostId)}
      />
      <PostDetail {...post} />
      <LikeComment
        likeCount={post.likeCount}
        commentCount={post.commentList.length}
        isLike={post.isLike}
        onClick={ChangeIsLike}
      />
      { post.commentList && post.commentList.map((comment, commentIndex) => 
        <UserNameContent key={commentIndex} comment={comment} onDelete={() => handleDeleteComment(comment.communityPostCommentId)} />
      )}
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