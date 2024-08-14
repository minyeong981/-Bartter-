import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import PostCard from '@/components/Community/PostCard';
import EmptyPost from '@/components/Empty/EmptyPost';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import Threshold from '@/components/Threshold';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './community.module.scss';

const PAGE_LIMIT = 5;
const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/_protected/search/_layout/_result/community/$keyword',
)({
  component: CommunityResultPage,
});

export default function CommunityResultPage() {
  const {keyword} = Route.useParams();
  const {data, fetchNextPage} = useSuspenseInfiniteQuery({
    queryKey: [querykeys.COMMUNITY_LIST, keyword, PAGE_LIMIT],
    queryFn: ({pageParam}) =>
      barter.getCommunityPostListByKeyword(keyword, pageParam, PAGE_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (prevPage, _, lastPageParam) => {
      if (prevPage.data.data.length % PAGE_LIMIT === 0) {
        return lastPageParam + 1;
      }
    },
  });

  const {rootElementRef, lastElementRef} = useInfiniteScroll(fetchNextPage);

  const searchResultData = data.pages.map(page => page.data.data).flat();

  return (
    <>
      <HeaderWithLabelAndBackButton
        label="동네 모임"
        style={{position: 'static'}}
      />
      <div className={cx('result-box')}>
        <span className={cx('result-text')}>{keyword}</span>
        검색 결과
      </div>
      <div className={cx('postList')} ref={rootElementRef}>
        {searchResultData.length ? (
          searchResultData.map((trade, index) => (
            <PostCard key={index} {...trade} />
          ))
        ) : (
          <EmptyPost text={keyword + '로 검색한 결과가 없습니다.'} />
        )}
        <Threshold ref={lastElementRef} />
      </div>
    </>
  );
}