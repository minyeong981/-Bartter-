import './PostList.scss';

import { FaComment,FaHeart } from 'react-icons/fa';

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
    postCards: PostCard[]
}

export default function PostList({ postCards }: PostCardProps) {

    function handleClick() {
        return 
    }
    
    return (
        <div className='community'>
            {postCards.map((card, index) => (
                <div className="community-card" key={index}>
                    <div className="location">{card.location}</div>
                    <div className="card-content" onClick={ handleClick}>
                        <div className="text-box">
                            <div className="text-title">{card.title}</div>
                            <div>{card.content}</div>
                            <div className="time">{card.date}</div>
                        </div>
                        {card.imageSrc.map((src, imgIndex) => (
                        <img key={imgIndex} src={src} alt={card.title} />
                        ))}
                    </div>
                    <div className="icon-box">
                        <div className="like-count"><FaHeart /> 좋아요 {card.likeCount}</div>
                        <div className="comment-count"><FaComment /> 댓글 {card.commentCount}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
