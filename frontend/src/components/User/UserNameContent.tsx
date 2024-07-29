import './UserNameContent.scss';

import { FaBars } from 'react-icons/fa';  // FaBars는 FontAwesome의 메뉴 아이콘입니다.

export interface Userinfo {
    profileImageSrc: string;
    userName: string;
}
export interface PostInfo {
    content: string;
    createDate: string;
}

export type UserNameLocationProps = Userinfo & PostInfo;

export default function UserNameLocation({profileImageSrc, userName, content, createDate}: UserNameLocationProps) {

    function onClick() {
        console.log('click Menu');
    }

    return (
        <div className="c-user-info-container">
            <img className="c-profile-image" src={profileImageSrc} alt={`${userName}'s profile`} />
            <div className="c-user-info">
                <div className="c-user-name">{userName}</div>
                <div className="c-content">{content}</div>
                <div className="c-create-date">{createDate}</div>
            </div>
            <FaBars className="c-menu-icon" onClick={onClick} />
        </div>
    );
}
