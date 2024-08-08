import { useMutation, useQuery } from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import { key } from 'localforage';
import { useState } from 'react';

import PostList from '@/components/Community/PostList';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons';
import Location from '@/components/Header/Location';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

// import useRootStore from '@/store';
import styles from './index.module.scss';

export const Route = createFileRoute('/_layout/_protected/search/$result/_layout/')({
  component: SearchResult,
});

// useParams로 받아와야함 검색결과 인풋 => ex) 상추

export default function SearchResult() {
  const {result} = Route.useParams();
  const {sortBy}: {sortBy: string} = Route.useSearch();
  const [ page, setPage ] = useState<number>(0);
  const [limit] = useState<number>(1000)

  const { data:community } = useQuery({
    queryKey: [querykeys.COMMUNITY_LIST, page, limit, false, result],
    queryFn: () => barter.getCommunityPostList(page, limit, false, result)
  })

  const posts = community?.data.data || []

  return (
    <div>
      <div className={styles.HeaderWithLabelAndButtonsLayout}>
      <HeaderWithLabelAndButtons label={<Location location='위치등록'/>} />
      </div>
      <div className={styles.resultBox}>
        <div className={styles.resultText}>{result}</div>
        검색 결과
      </div>

      <div className={styles.sortByResultFixed}>
      {sortBy === '물물 교환' && '물물교환'}
      {sortBy === '동네 모임' && ( 
        posts && posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div>동네 모임 글이 없습니다.</div>
        )
      )}
      </div>
    </div>
  );
}