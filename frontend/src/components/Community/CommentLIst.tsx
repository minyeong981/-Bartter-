import type { ChangeEvent} from 'react';
import {useState} from 'react';

import UserImage from '@/assets/image/유저.png';

import UserNameLocation from '../User/UserNameContent';


export default function CommentList() {

    const [inputValue, setInputValue] = useState('댓글을 입력하세요')

    function handleChange(event : ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value)
        console.log(event.target.value)
    }

    function handleClick() {
        console.log(inputValue)
        setInputValue('댓글을 입력하세요')
    }
    return (
        <div>
            <div>
                <UserNameLocation profileImageSrc={UserImage} content='댓글1' createDate='2024-07-03' userName='user1'/>
                <UserNameLocation profileImageSrc={UserImage} content='댓글2' createDate='2024-07-03' userName='user2'/>
            </div>
            <input type="text" value={inputValue} onChange={handleChange}/>
            <button onClick={handleClick}>입력</button>

        </div>
    )
}