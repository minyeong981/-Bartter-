import UserNameContent from '@/components/User/UserNameContent';
import type { Comment } from '@/store/communityStore';

export interface CommentDataProps {
  Comments: Comment[];
}

export default function CommentList({Comments}: {Comments: Comment[]}) {

  return (
    <div>
      <div>
        {Comments.map((comment, index) => (
          <UserNameContent
            key={index}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
}