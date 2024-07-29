import type { ChangeEvent} from 'react';
import {useState} from 'react';

import UserImage from '@/assets/image/유저.png';

import UserNameLocation from '../User/UserNameContent';

// 댓글에 대한 정보 (댓글 작성자 닉네임, 댓글 내용, 댓글 작성 시간)
interface CommentData {
    postId : number;
    userName: string;
    content: string;
    createDate: string;
    profileImageSrc: string;
}

interface CommentDataProps {
    Comments:CommentData[]
}

const mockData = [
        { userName: 'user1', content: '댓글1', createDate: '2024-07-03', profileImageSrc: UserImage },
        { userName: 'user9', content: '댓글2', createDate: '2024-07-03', profileImageSrc: UserImage }
    ]


export default function CommentList({Comments} : CommentDataProps) {

    const [comments, setComments] = useState(mockData);

    const [inputValue, setInputValue] = useState('댓글을 입력하세요')

    function handleChange(event : ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value)
        console.log(event.target.value)
    }

    // 댓글 추가
    function handleClick() {
        const newComment: CommentData = {
            userName: 'newUser',
            content: inputValue,
            createDate: new Date().toISOString().split('T')[0],
            profileImageSrc: UserImage
        }
        setComments([...comments, newComment]);
        setInputValue('댓글을 입력하세요')
    }
    return (
        <div>
            <div>
                {comments.map((comment, index) => (

                <UserNameLocation 
                key={index} 
                profileImageSrc={UserImage} 
                content={comment.content} 
                createDate={comment.createDate} 
                userName={comment.userName} />
                ))}
                </div>
                
            <div>
            <input type="text" value={inputValue} onChange={handleChange}/>
            <button onClick={handleClick}>입력</button>
            </div>

        </div>
    )
}