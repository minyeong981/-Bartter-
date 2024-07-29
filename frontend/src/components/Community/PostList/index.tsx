import classnames from 'classnames/bind';
import {FaComment, FaHeart} from 'react-icons/fa';

import styles from './postList.module.scss';

export interface PostCard {
  location: string;
  title: string;
  content: string;
  date: string;
  imageSrc: string[]; // 최대 3개 이미지
  likeCount: number;
  commentCount: number;
}

interface PostCardProps {
  postCards: PostCard[];
}

const cx = classnames.bind(styles);

export default function PostList({postCards}: PostCardProps) {
  function handleClick() {
    return;
  }

  return (
    <div className="community">
      {postCards.map((card, index) => (
        <div className={cx('community-card')} key={index}>
          <div className={cx('location')}>{card.location}</div>
          <div className={cx('card-content')} onClick={handleClick}>
            <div className={cx('text-box')}>
              <div className={cx('text-title')}>{card.title}</div>
              <div>{card.content}</div>
              <div className={cx('time')}>{card.date}</div>
            </div>
            {card.imageSrc.map((src, imgIndex) => (
              <img key={imgIndex} src={src} alt={card.title} />
            ))}
          </div>
          <div className={cx('icon-box')}>
            <div className={cx('like-count')}>
              <FaHeart /> 좋아요 {card.likeCount}
            </div>
            <div className={cx('comment-count')}>
              <FaComment /> 댓글 {card.commentCount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}