import { useQuery } from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';

import PostList from '@/components/Community/PostList';
import TwoButton from '@/components/TwoButton/TwoButton';
import barter from '@/services/barter';

import styles from './../community.module.scss'


export const Route = createFileRoute('/_layout/community/_layout/')({
  component: CommunityList,
});

export default function CommunityList() {
  const [activeComponent, setActiveComponent] = useState<string>('전체글');
  const isCommunity = activeComponent === '동네글'; // 처음은  false가 들어감
  const [ page, setPage ] = useState<number>(0);
  const [limit] = useState<number>(10)

  const { data , isPending } = useQuery({
    queryKey: ['COMMUNITY_LIST', page, limit, isCommunity],
    queryFn:()=> barter.getCommunityPostList(page, limit, isCommunity)
  })

  if (isPending) {
    return <span>Loading...</span>
  }
  
  // console.log(data?.data.data)

  const renderComponent = () => {

    if ( ! data?.data?.data || data.data.data.length === 0) {
      return <div>게시글이 없습니다.</div>
    }

    return <PostList posts={data.data.data}/>

    // switch (activeComponent) {
    //   case '전체글':
    //     return data?.data.data ? <PostList posts={data.data.data} /> : null;
    //   case '동네글':
    //     return data?.data.data ? <PostList posts={data.data.data} /> : null;
    //   default:
    //     return null;
    // }
  };

  const handleButtonClick = (button: string) => {
    setActiveComponent(button);
  };

  return (
    <div>
      <div className={styles.twoButtonFixed}>
      <TwoButton
        first="전체글"
        second="동네글"
        activeButton={activeComponent}
        onClick={handleButtonClick}
      />
      </div>
      <div className={styles.postList} >{renderComponent()}</div>
    </div>
  );
}
