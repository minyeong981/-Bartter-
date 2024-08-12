import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import PostList from '@/components/Community/PostList';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons';
import Location from '@/components/Header/Location';
import NeighborListCard from '@/components/Neighbor/NeighborListCard';
import TradeCard from '@/components/TradeCard';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './index.module.scss';

export const Route = createFileRoute(
  '/_layout/_protected/search/_layout/_layout/$keyword/_layout/',
)({
  component: SearchResult,
});

const cx = classnames.bind(styles);

export default function SearchResult() {
  const userId: UserId = useRootStore(state => state.userId);
  const {keyword}: {keyword: string} = Route.useParams();
  const {sortBy}: {sortBy: string} = Route.useSearch();
  // const [ page, setPage ] = useState<number>(0);
  const page = 0;
  const [limit] = useState<number>(1000);

  const {data} = useSuspenseQuery({
    queryKey: [querykeys.LOCATION, userId],
    queryFn: () => barter.getUserLocation(userId),
  });

  const {data: trade} = useSuspenseQuery({
    queryKey: [querykeys.TRADE_LIST, keyword, page, limit],
    queryFn: () => barter.getTradePostListByKeyword(keyword, page, limit),
  });

  const {data: community} = useSuspenseQuery({
    queryKey: [querykeys.COMMUNITY_LIST, keyword, page, limit],
    queryFn: () => barter.getCommunityPostListByKeyword(keyword, page, limit),
  });

  const {data: user} = useSuspenseQuery({
    queryKey: [querykeys.PROFILE_LIST, keyword, page, limit],
    queryFn: () => barter.getUserListByKeyword(keyword, page, limit),
  });

  const location = data.data.data;
  const posts = community.data.data;
  const trades = trade.data.data;
  const users = user.data.data;

  return (
    <>
      <HeaderWithLabelAndButtons
        label={
          <Location
            location={location.name.split(' ').slice(2, 3).toString()}
          />
        }
      />

      <div className={cx('result-box')}>
        <div className={cx('result-text')}>{keyword}</div>
        검색 결과
      </div>

      {sortBy === '물물 교환' && (
        <div className={cx('trade')}>
          {trades.map((trade, index) => (
            <TradeCard key={index} {...trade} />
          ))}
        </div>
      )}

      {sortBy === '동네 모임' && (
        <div className={cx('community')}>
          <PostList posts={posts} />
        </div>
      )}

      {sortBy === '이웃' && (
        <div className={cx('neighbor')}>
          {users.map((user, userIndex) => (
            <NeighborListCard key={userIndex} {...user} />
          ))}{' '}
        </div>
      )}
    </>
  );
}