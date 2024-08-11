import { useSuspenseQuery } from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind'
import {useState} from 'react';

import PostCard from '@/components/Community/PostCard';
// import PostList from '@/components/Community/PostList';
import EmptyPost from '@/components/Empty/EmptyPost';
import TwoButton from '@/components/TwoButton/TwoButton';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../community.module.scss'

const cx = classnames.bind(styles)

export const Route = createFileRoute('/_layout/_protected/community/_layout/')({
  component: CommunityList,
});

export default function CommunityList() {
  const [activeComponent, setActiveComponent] = useState<string>('전체글');
  const isCommunity = activeComponent === '동네글'; // 처음은  false가 들어감
  // const [ page, setPage ] = useState<number>(0);
  const page = 0;
  const [limit] = useState<number>(10)

  const { data} = useSuspenseQuery({
    queryKey: [ querykeys.COMMUNITY_LIST, page, limit, isCommunity],
    queryFn:()=> barter.getCommunityPostList(page, limit, isCommunity)
  })

  const posts = data?.data?.data || []


  const renderComponent = () => {

    if ( posts.length === 0) {
      return <EmptyPost text='게시글이 없습니다.' />
    }

    return (
      <div className={cx('post-container')}>
      {posts.map((post, index) => 
      <PostCard key={index} {...post} />
      )}
      </div>
  )

  };

  const handleButtonClick = (button: string) => {
    setActiveComponent(button);
  };

  return (
    <div>
      <div className={cx('two-button-fixed')}>
      <TwoButton
        first="전체글"
        second="동네글"
        activeButton={activeComponent}
        onClick={handleButtonClick}
      />
      </div>
      {renderComponent()}
    </div>
  );
}
