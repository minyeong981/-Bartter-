import './index.scss'

import { createFileRoute } from '@tanstack/react-router'

import SweatPotato from '../../../assets/image/고구마.png'
import CommunityImage from '../../../assets/image/동네모임1.png'
import StroyImage from '../../../assets/image/스토리1.png'
import UserImage from '../../../assets/image/유저.png'
import AdCarousel from '../../../components/AdCarousel'
import LinkButton from '../../../components/Buttons/LinkButton'
import CardCarousel from '../../../components/CardCarousel'
import CommunityCard from '../../../components/CoummunityCard'
import Header from '../../../components/Header'
import StoryCarousel from '../../../components/Story/carousel'

const barterCards = [
  {
    imageSrc: SweatPotato,
    title: 'Card Title 1',
    date: '2024-07-25',
  },
  {
    imageSrc: SweatPotato,
    title: 'Card Title 2',
    date: '2024-07-24',
  },
  {
    imageSrc: SweatPotato,
    title: 'Card Title 3',
    date: '2024-07-24',
  },
  {
    imageSrc: SweatPotato,
    title: 'Card Title 4',
    date: '2024-07-24',
  },
  {
    imageSrc: SweatPotato,
    title: 'Card Title 5',
    date: '2024-07-24',
  },
  {
    imageSrc: SweatPotato,
    title: 'Card Title 6',
    date: '2024-07-24',
  },
  {
    imageSrc: SweatPotato,
    title: 'Card Title 7',
    date: '2024-07-24',
  },
  {
    imageSrc: SweatPotato,
    title: 'Card Title 8',
    date: '2024-07-24',
  },
];

const communities = [
  {
    imageSrc: CommunityImage,
    location: '서울 강남구',
    title: '동네 마라톤 대회',
    content: '함께 달려요! 초보자도 환영합니다.',
    time: '2024-07-25 오후 5:00',
  },
  {
    imageSrc: CommunityImage,
    location: '서울 강남구',
    title: '동네 마라톤 대회',
    content: '함께 달려요! 초보자도 환영합니다.',
    time: '2024-07-25 오후 5:00',
  },
]

const storyData = [
  {
    storyImage:StroyImage,
    profileImage:UserImage,
    username:'user1'
  },
  {
    storyImage:StroyImage,
    profileImage:UserImage,
    username:'user1'
  },
  {
    storyImage:StroyImage,
    profileImage:UserImage,
    username:'user1'
  },
  {
    storyImage:StroyImage,
    profileImage:UserImage,
    username:'user1'
  },
  {
    storyImage:StroyImage,
    profileImage:UserImage,
    username:'user1'
  },
  {
    storyImage:StroyImage,
    profileImage:UserImage,
    username:'user1'
  },
]

export const Route = createFileRoute('/_layout/home/')({
  component: () => (
    <>
    <Header location='내위치' infoIcon='내정보' searchIcon='검색' alramIcon='알림'/>
    <div className="container">
    <div className='container'>
    <AdCarousel />
          <div>
        <h1>물물 교환</h1>
      </div>
    <CardCarousel cards={barterCards} />
    <div className="link-button-container">
      <LinkButton buttonStyle={{style: 'primary', size: 'medium'}}>물물 교환 더보기</LinkButton>
    </div>
    <div>
      <h1>동네 모임</h1>
      {communities.map((community, index) => (
              <CommunityCard key={index} {...community} />
            ))}
    </div>
      <div className="link-button-container">
      <LinkButton buttonStyle={{style: 'primary', size: 'medium'}} >동네 모임 더보기</LinkButton>
      </div>
      <div>
        <h1>이웃의 농사 일지</h1>
      </div>
      <StoryCarousel stories={storyData} />
    </div>
    </div>
    </>
    )
})