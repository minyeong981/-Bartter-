import UserNameLocation from '@/components/User/UserNameContent';

interface User {
  profileImage: string;
  nickname: string;
}

interface Comment {
  content: string;
  created_at: string;
  user: User;
}

export interface CommentDataProps {
  Comments: Comment[];
}

export default function CommentList({Comments}: CommentDataProps) {
  return (
    <div>
      <div>
        {Comments.map((comment, index) => (
          <UserNameLocation
            key={index}
            profileImageSrc={comment.user.profileImage}
            content={comment.content}
            created_at={comment.created_at}
            userName={comment.user.nickname}
          />
        ))}
      </div>
    </div>
  );
}