import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

import PostList from '@/components/Community/PostList';
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
  const [activeComponent, setActiveComponent] = useState<string>('물물교환');

  const { data:community, isPending } = useQuery({
    queryKey: [querykeys.COMMUNITY_WRITTEN_BY_USER, userId],
    queryFn : () => barter.getCommunityPostListByUser(userId)
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  const posts = community?.data?.data || [];

  function renderComponent() {
    switch (activeComponent) {
      case '물물 교환':
        return <div>물물교환</div>;
      case '동네 모임':
        return posts.length===0 ? (
          <div>작성한 게시글이 없습니다.</div>
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