
import { FaComment, FaHeart } from 'react-icons/fa';

import CommunityImage from '@/assets/image/동네모임1.png';
import UserImage from '@/assets/image/유저.png';

import UserNameContent from '../User/UserNameContent';
import styles from './PostDetail.module.scss'; // CSS Modules import

// 유저에 대한 정보 (작성자 닉네임, 작성자가 작성한 위치, 작성자 작성 시간)
// 게시글에 대한 정보 ( 제목, 내용, 게시글 사진 리스트, 좋아요 수, 댓글 수)


export default function PostDetail() {
    return (
        <div className={styles.postDetail}>
            <div className={styles.userNameContent}>
                <UserNameContent 
                    profileImageSrc={UserImage} 
                    content='장덕동' 
                    createDate='2024-07-03' 
                    userName='user0' 
                />
            </div>
            <img className={styles.image} src={CommunityImage} alt="Community Post" />
            <div className={styles.pIconBox}>
                <div className={styles.pLikeCount}><FaHeart /> 좋아요 32</div>
                <div className={styles.pCommentCount}><FaComment /> 댓글 3</div>
            </div>
        </div>
    );
}