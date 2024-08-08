import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useState } from 'react';

import AdCarousel from '@/components/AdCarousel';
import LinkButton from '@/components/Buttons/LinkButton';
import PostList from '@/components/Community/PostList';
import HomeTradeCardList from '@/components/HomeTradeCard/HomeTradeCardList';
import HomeStory from '@/components/Story/HomeStory';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../home.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/_home/')({
  component: Home,
});

export default function Home() {
  const givenCategory = 0;
  const isCommunity = false
  const [ page, setPage ] = useState<number>(0);
  const [limit] = useState<number>(2)

  const { data: trade } = useSuspenseQuery({
    queryKey: [querykeys.TRADE_LIST, page, limit, givenCategory],
    queryFn: ()=> barter.getTradePostList(0, 10, 0)
  })

  const { data:community } = useSuspenseQuery({
    queryKey: [querykeys.COMMUNITY_LIST, page, limit, isCommunity],
    queryFn:()=> barter.getCommunityPostList(page, limit, isCommunity)
  })

  const { data: cropStory } = useSuspenseQuery({
    queryKey: [querykeys.DIARY_LIST],
    queryFn: () => barter.getNeighborCropDiaryList(5)
  })

  const trades = trade.data.data
  const posts = community.data.data
  const crops = cropStory.data.data

  return (
    <div className={cx('container')}>
      <AdCarousel />
      <div className={cx('home-barter')}>
        <div className={cx('section-title')}>
          <div>물물 교환</div>
        </div>
        <HomeTradeCardList trades={trades} />
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
            <HomeStory stories={crops} />
          </div>
        </div>
      </div>
    </div>
  );
}