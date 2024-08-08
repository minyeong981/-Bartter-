import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

import PostList from '@/components/Community/PostList';
import TradeCard from '@/components/TradeCard';
import TwoButton from '@/components/TwoButton/TwoButton';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './../writed.module.scss'

export const Route = createFileRoute('/_layout/_protected/profile/writed/_layout/')({
  component: ProfileWrited
})

export default function ProfileWrited() {

  const userId:UserId = useRootStore((state) => state.userId)
  const [activeComponent, setActiveComponent] = useState<string>('물물 교환');

  const { data:community, isPending } = useQuery({
    queryKey: [querykeys.COMMUNITY_WRITTEN_BY_USER, userId],
    queryFn : () => barter.getCommunityPostListByUser(userId)
  })

  const { data:trade } = useQuery({
    queryKey: [querykeys.TRADE_LIST, userId],
    queryFn: () => barter.getTradePostListByUser(userId)
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  const posts = community?.data?.data || [];
  const trades = trade?.data.data || []

  function renderComponent() {
    switch (activeComponent) {
      case '물물 교환':
        return trades.length===0 ? (
        <div>작서한 물물교환 게시글이 없습니다.</div>
        ) : (
          trades.map((trade, index) => 
            <TradeCard key={index} {...trade}/>
          )
        );
      case '동네 모임':
        return posts.length===0 ? (
          <div>작성한 동네모임 게시글이 없습니다.</div>
        ) : ( 
        <PostList posts={posts} />
      )
      default:
        return null;
    }
  };

  function handleButtonClick(button : string) {
    setActiveComponent(button)
  }

  return (
    <div>
      <div className={styles.twoButtonFixed}>
      <TwoButton 
      first='물물 교환'
      second='동네 모임'
      activeButton={activeComponent}
      onClick={handleButtonClick}/>
      </div>
      <div className={styles.renderComponent}>
        {renderComponent()}
      </div>
    </div>
  )
}