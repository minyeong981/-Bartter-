import './UserNameContent.scss';

import {FaBars} from 'react-icons/fa';

export interface Userinfo {
  profileImageSrc: string;
  userName: string;
}

export interface PostInfo {
  content: string;
  created_at: string;
}

export type UserNameLocationProps = Userinfo & PostInfo;

export default function UserNameLocation({
  profileImageSrc,
  userName,
  content,
  created_at,
}: UserNameLocationProps) {
  function onClick() {
    console.log('click Menu');
  }

  return (
    <div className="c-user-info-container">
      <img
        className="c-profile-image"
        src={profileImageSrc}
        alt={`${userName}'s profile`}
      />
      <div className="c-user-info">
        <div className="c-user-name">{userName}</div>
        <div className="c-content">{content}</div>
        <div className="c-create-date">{created_at}</div>
      </div>
      <FaBars className="c-menu-icon" onClick={onClick} />
    </div>
  );
}