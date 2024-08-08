import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const Route = createFileRoute('/_layout/community/detail/_layout/$postId')({
  component: CommunityPostDetail
});

export default function CommunityPostDetail() {
  const queryClient = useQueryClient();
  const {postId}: {postId: number} = Route.useParams();
  const [content, setContent] = useState(''); // 댓글

  const navigate = useNavigate({from: '/community/detail/$postId'})

  const { isPending, data } = useQuery({
    queryKey: [ querykeys.COMMUNITY_DETAIL, postId],
    queryFn: () => barter.getCommunityPost(postId),
    // enabled: !!postId
  })

  const deletePost = useMutation({
    mutationFn: ( postId : CommunityPostId ) => {
      return barter.deleteCommunityPost(postId)
    },
    onError: ()=> {
    window.alert('작성자만 삭제할 수 있습니다.')
    navigate({to: `/community/detail/${postId}`})
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : [querykeys.COMMUNITY_DETAIL]});
      navigate({to: '/community'})
    }
  })

  // console.log(data?.data.data)
  const addComment = useMutation({
    mutationFn: ({communityPostId, content} : { communityPostId:CommunityPostId; content: string }) =>  {
      return barter.postCommunityComment(communityPostId, content)
    },
    onError: (error) => {
      console.log('댓글 작성 실패', error)
    },
    onSuccess: (data) => {
      console.log('댓글 생성 성공',data)
      setContent(''); // 초기화
      queryClient.invalidateQueries({queryKey : [querykeys.COMMUNITY_DETAIL]});
    }
  })

  const deleteComment = useMutation({
    mutationFn: ({postId, commentId} : {postId:CommunityPostId; commentId : CommentId }) => {
      return barter.deleteCommunityComment(postId, commentId)
    },
    onError: () => {
      window.alert('작성자만 삭제할 수 있습니다.')
      navigate({to: `/community/detail/${postId}`})
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
    
  if ( isPending ) {
    return <span>Loading...</span>
  }

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


  if ( ! data?.data?.data) {
  return <div>게시글이 없습니다.</div>
  } 


  return (
    <div>
      <UserNameLocation
        locationName={data.data.data.location.name}
        postId={data.data.data.communityPostId}
        createdAt={data.data.data.createdAt}
        userId={data.data.data.author.userId}
        nickname={data.data.data.author.nickname}
        profileImage={data.data.data.author.profileImage}
        onDelete={() => handleDeletePost(data.data.data.communityPostId)}
      />
      <PostDetail post={data.data.data} 
        />
      <LikeComment
        likeCount={data.data.data.likeCount}
        commentCount={data.data.data.commentList.length}
        isLike={data.data.data.isLike}
        onClick={ChangeIsLike}
      />
      { data.data.data.commentList && data.data.data.commentList.map((comment, commentIndex) => 
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