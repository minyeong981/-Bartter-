import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';

import PostCard from "@/components/Community/PostCard";
import Threshold from "@/components/Threshold";
import TwoButton from '@/components/TwoButton/TwoButton';
import useInfiniteScroll from "@/hooks/useInfiniteScroll.tsx";
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './../community.module.scss'


export const Route = createFileRoute('/_layout/_protected/community/_layout/')({
  component: CommunityList,
});

const PAGE_LIMIT = 5;

export default function CommunityList() {
  const [activeComponent, setActiveComponent] = useState<string>('전체글');
  const isCommunity = activeComponent === '동네글';
  const {data, fetchNextPage} = useSuspenseInfiniteQuery({
    queryKey: [querykeys.COMMUNITY_LIST, PAGE_LIMIT, isCommunity],
    queryFn: ({pageParam}) => barter.getCommunityPostList(pageParam, PAGE_LIMIT, isCommunity),
    initialPageParam: 0,
    getNextPageParam: (prevPage, _, lastPageParam) => {
      if (prevPage.data.data.length && prevPage.data.data.length % PAGE_LIMIT === 0)
        return lastPageParam + 1;
    }
  })
  const {rootElementRef, lastElementRef} = useInfiniteScroll(fetchNextPage);

  const communityList = data.pages.map(page => page.data.data).flat();

  const handleButtonClick = (button: string) => {
    setActiveComponent(button);
  };

  return (
    <>
      <div className={styles.twoButtonFixed}>
        <TwoButton
          first="전체글"
          second="동네글"
          activeButton={activeComponent}
          onClick={handleButtonClick}
        />
      </div>
      <div className={styles.postList} ref={rootElementRef}>
        {communityList.map((post) => <PostCard key={post.communityPostId}  {...post}/>)}
        <Threshold ref={lastElementRef}/>
      </div>
    </>
  );
}