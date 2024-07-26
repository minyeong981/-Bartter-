import './HomeStory.scss'

interface FollowCard {
    diaryImageSrc: string;
    profileImageSrc: string;
    userName:string;
}

interface FollowCardProps {
    followCards: FollowCard[]
}

export default function HomeStory({ followCards }: FollowCardProps) {
    return (
        <div className="home-story">
            <div className="carousel-container">
                {followCards.map((card, index) => (
                    <div className="story-card" key={index}>
                        <img className="diary-image" src={card.diaryImageSrc} alt="" />
                        <img className="profile-image" src={card.profileImageSrc} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}
