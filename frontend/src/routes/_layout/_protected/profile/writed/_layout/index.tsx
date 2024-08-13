import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useState} from 'react';

import PostCard from '@/components/Community/PostCard';
import EmptyPost from '@/components/Empty/EmptyPost';
import TradeCard from '@/components/TradeCard';
import TwoButton from '@/components/TwoButton/TwoButton';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './../writed.module.scss';

const cx = classnames.bind(styles);
export const Route = createFileRoute(
  '/_layout/_protected/profile/writed/_layout/',
)({
  component: ProfileWrited,
});

export default function ProfileWrited() {
  const userId: UserId = useRootStore(state => state.userId);
  const [activeComponent, setActiveComponent] = useState<string>('물물 교환');

  const {data: community } = useSuspenseQuery({
    queryKey: [querykeys.COMMUNITY_WRITTEN_BY_USER, userId],
    queryFn: () => barter.getCommunityPostListByUser(userId),
  });

  const {data: trade} = useSuspenseQuery({
    queryKey: [querykeys.TRADE_LIST, userId],
    queryFn: () => barter.getTradePostListByUser(userId),
  });


  const posts = community?.data?.data || [];
  const trades = trade?.data?.data || [];

  function renderComponent() {
    switch (activeComponent) {
      case '물물 교환':
        return trades.length === 0 ? (
          <div>
            <EmptyPost text='작성한 물물교환' text2='게시글이 없습니다.' />
          </div>
        ) : (
          <div className={cx('trade')}>
            {trades.map((trade, tradeIndex) => (
              <TradeCard key={tradeIndex} {...trade} />
            ))}
          </div>
        );
      case '동네 모임':
        return posts.length === 0 ? (
          <div>
            <EmptyPost text="작성한 동네모임" text2="게시글이 없습니다." />
          </div>
        ) : (
          <div className={cx('community')}>
            {posts.map((post, postIndex) => 
            <PostCard key={postIndex} {...post}/>
            )}
          </div>
        );
      default:
        return null;
    }
  }

  function handleButtonClick(button: string) {
    setActiveComponent(button);
  }

  return (
    <div>
      <div className={cx('two-button-fixed')}>
        <TwoButton
          first="물물 교환"
          second="동네 모임"
          activeButton={activeComponent}
          onClick={handleButtonClick}
        />
      </div>
      {renderComponent()}
    </div>
  );
}