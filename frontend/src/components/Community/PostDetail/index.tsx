import classnames from 'classnames/bind';
import {FaComment, FaHeart} from 'react-icons/fa';

import CommunityImage from '@/assets/image/동네모임1.png';
import UserImage from '@/assets/image/유저.png';

import UserNameContent from '../../User/UserNameContent.tsx';
import styles from './postDetail.module.scss';

const cx = classnames.bind(styles);

export default function PostDetail() {
  return (
    <div className={cx('postDetail')}>
      <div className={cx('userNameContent')}>
        <UserNameContent
          profileImageSrc={UserImage}
          content="장덕동"
          createDate="2024-07-03"
          userName="user0"
        />
      </div>
      <img className={cx('image')} src={CommunityImage} alt="Community Post" />
      <div className={cx('pIconBox')}>
        <div className={cx('pLikeCount')}>
          <FaHeart /> 좋아요 32
        </div>
        <div className={cx('pCommentCount')}>
          <FaComment /> 댓글 3
        </div>
      </div>
    </div>
  );
}