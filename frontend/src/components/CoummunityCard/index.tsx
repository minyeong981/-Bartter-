import './index.scss';

import { FaComment,FaHeart } from 'react-icons/fa';  // 하트와 댓글 아이콘

const CommunityCard = ({ imageSrc, location, title, content, time } : {imageSrc:string, location:string, title:string, content:string, time:string}) => {
  return (
    <div className="neighborhood-card">
      <div className="image-container">
        <img src={imageSrc} alt={title} className="card-image" />
      </div>
      <div className="info-container">
        <div className="location-container">
          <span className="location">{location}</span>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-content">{content}</p>
        <p className="card-time">{time}</p>
        <div className="card-footer">
          <div className="like-comment">
            <FaHeart className="icon" />
            <span className="like-count">10</span> {/* 좋아요 개수 */}
            <FaComment className="icon" />
            <span className="comment-count">5</span> {/* 댓글 개수 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
