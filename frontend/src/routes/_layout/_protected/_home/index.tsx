import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import titleCommunity from '@/assets/lottie/titleCommunity.json';
import titleNeighbor from '@/assets/lottie/titleNeighbor.json';
import Trade from '@/assets/lottie/trade.json';
import AdCarousel from '@/components/AdCarousel';
import PostCard from '@/components/Community/PostCard';
import HomeTradeCardList from '@/components/HomeTradeCard/HomeTradeCardList';
import HomeStory from '@/components/Story/HomeStory';
import Title from '@/components/Title';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../home.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/_home/')({
  component: Home,
});

export default function Home() {
  const givenCategory = 0;
  const isCommunity = true;
  // const [ page, setPage ] = useState<number>(0);
  const page = 0;
  const [limit] = useState<number>(2);

  const {data: trade} = useSuspenseQuery({
    queryKey: [querykeys.TRADE_LIST, page, limit, givenCategory],
    queryFn: () => barter.getTradePostList(0, 10, 0),
  });

  const {data: community} = useSuspenseQuery({
    queryKey: [querykeys.COMMUNITY_LIST, page, limit, isCommunity],
    queryFn: () => barter.getCommunityPostList(page, limit, isCommunity),
  });

  const {data: cropStory} = useSuspenseQuery({
    queryKey: [querykeys.DIARY_LIST],
    queryFn: () => barter.getNeighborCropDiaryList(5),
  });

  const trades = trade.data.data;
  const posts = community.data.data;
  const crops = cropStory.data.data;

  return (
    <div className={cx('container')}>
      <AdCarousel />
      <div className={cx('home-barter')}>
        <Title title="물물 교환" to="/trade" lottie={Trade} />
        {trades.length === 0 ? (
          <div className={cx('empty-text')}>물물 교환 게시글이 없습니다</div>
        ) : (
          <div>
            <HomeTradeCardList trades={trades} />
          </div>
        )}
      </div>

      <div className={cx('home-community')}>
        <Title title="동네 모임" to="/community" lottie={titleCommunity} />
        {posts.length === 0 ? (
          <div className={cx('empty-text')}>동네 모임 게시글이 없습니다</div>
        ) : (
          <div className={cx('post-list')}>
            {posts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>
        )}
      </div>

      <div className={cx('home-story')}>
        <Title title="이웃의 농사일지" lottie={titleNeighbor} />
        <div className={cx('home-story-carousel')}>
          {crops.length === 0 && (
            <div className={cx('empty-text')}>
              이웃이 아직 없네요! 이웃을 만들어보세요!
            </div>
          )}
          <div>{crops.length !== 0 && <HomeStory stories={crops} />}</div>
        </div>
      </div>
    </div>
  );
}
