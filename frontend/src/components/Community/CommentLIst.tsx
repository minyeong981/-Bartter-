import UserNameLocation from '../User/UserNameContent';

export interface CommentDataProps {
    Comments:Comment[]
}

export default function CommentList({ Comments } : {Comments : CommentDataProps}) {


    return (
        <div>
            <div>
                {Comments.map((comment, index) => 
                <UserNameLocation 
                key={index} 
                profileImageSrc={comment.user.profileImage} 
                content={comment.content} 
                created_at={comment.created_at} 
                userName={comment.user.nickname} />
                )}
                </div>

        </div>
    )
}