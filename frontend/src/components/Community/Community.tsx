import './Community.scss';

interface CommunityCard {
    location: string;
    title: string;
    content: string;
    date: string;
    imageSrc: string;
    likeCount: number;
    commentCount: number;
}

interface CommunityCardProps {
    communityCards: CommunityCard[]
}

export default function Community({ communityCards }: CommunityCardProps) {
    return (
        <div className='community'>
            {communityCards.map((card, index) => (
                <div className="community-card" key={index}>
                    <div className="location">{card.location}</div>
                    <div className="card-content">
                        <div className="text-box">
                            <div className="text-title">{card.title}</div>
                            <div>{card.content}</div>
                            <div className="time">{card.date}</div>
                        </div>
                        <img src={card.imageSrc} alt={card.title} />
                    </div>
                    <div className="icon-box">
                        <div className="like-count">좋아요 {card.likeCount}</div>
                        <div className="comment-count">댓글 {card.commentCount}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
