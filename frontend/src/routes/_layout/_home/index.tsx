import { useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';

import SweatPotato from '@/assets/image/고구마.png';
import AdCarousel from '@/components/AdCarousel';
import BarterCard from '@/components/BarterCard';
import LinkButton from '@/components/Buttons/LinkButton';
import PostList from '@/components/Community/PostList';
import HomeStory from '@/components/Story/HomeStory';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../home.module.scss';

const barters = [
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
  {
    location: '수완동',
    title: 'Card Title 1',
    content: '교환합시다!',
    imageSrc: SweatPotato,
    date: '2024-07-25',
    likeCount: 3,
  },
];

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_home/')({
  component: Home,
});

export default function Home() {
  const isCommunity = false
  const [ page, setPage ] = useState<number>(0);
  const [limit] = useState<number>(2)

  const { data:community , isPending } = useQuery({
    queryKey: [querykeys.COMMUNITY_LIST, page, limit, isCommunity],
    queryFn:()=> barter.getCommunityPostList(page, limit, isCommunity)
  })

  const { data: cropStory, isLoading } = useQuery({
    queryKey: [querykeys.NEIGHBOR_CROP_LIST],
    queryFn: () => barter.getNeighborCropDiaryList(5)
  })

  if ( isPending || isLoading ) {
    return <span>Loading...</span>
  }

  const posts = community?.data?.data || [];
  // const crops = cropStory?.data.data || [];
  console.log(cropStory.data.data)

  return (
    <div className={cx('container')}>
      <AdCarousel />
      <div className={cx('home-barter')}>
        <div className={cx('section-title')}>
          <div>물물 교환</div>
        </div>
        <BarterCard barterCards={barters} />
      </div>

      <div className={cx('link-button-container')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'medium'}}
          to="/trade"
        >
          물물 교환 더보기
        </LinkButton>
      </div>

      <div className={cx('home-community')}>
        <div className={cx('section-title')}>
          <div>동네 모임</div>
        </div>
        { posts.length===0 ? 
        ( 
          <div>동네 모임 게시글이 없습니다.</div>
        )
        : (
        <PostList posts={posts}/>
      )
        }
      </div>
      <div className={cx('link-button-container')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'medium'}}
          to="/community"
        >
          동네 모임 더보기
        </LinkButton>
      </div>
      <div className={cx('home-story')}>
        <div className={cx('section-title')}>
          <div>이웃의 농사 일지</div>
          <div>
            {/* <HomeStory stories={NeighborStory} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}