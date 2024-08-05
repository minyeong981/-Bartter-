import UserNameContent from '@/components/User/UserNameContent';

export default function CommentList({postId, Comments}: {postId:number, Comments: PostComment[]}) {
  return (
    <div>
        {Comments.map((comment, index) => (
          <UserNameContent key={index} postId={postId} comment={comment} />
        ))}
    </div>
  );
}