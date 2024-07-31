import UserNameContent from '@/components/User/UserNameContent';

export default function CommentList({Comments}: {Comments: PostComment[]}) {
  return (
    <div>
      <div>
        {Comments.map((comment, index) => (
          <UserNameContent key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
}