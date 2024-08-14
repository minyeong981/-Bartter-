import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import EmptyPost from '@/components/Empty/EmptyPost';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import NeighborListCard from '@/components/Neighbor/NeighborListCard';
import Threshold from '@/components/Threshold';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './neighbor.module.scss';

const PAGE_LIMIT = 5;
const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/_protected/search/_layout/_result/neighbor/$keyword',
)({
  component: NeighborResultPage,
});

export default function NeighborResultPage() {
  const {keyword} = Route.useParams();
  const {data, fetchNextPage} = useSuspenseInfiniteQuery({
    queryKey: [querykeys.PROFILE_LIST, keyword, PAGE_LIMIT],
    queryFn: ({pageParam}) =>
      barter.getUserListByKeyword(keyword, pageParam, PAGE_LIMIT),
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
      <HeaderWithLabelAndBackButton label="이웃" style={{position: 'static'}} />
      <div className={cx('result-box')}>
        <span className={cx('result-text')}>{keyword}</span>
        검색 결과
      </div>
      <div className={cx('neighborList')} ref={rootElementRef}>
        {searchResultData.length ? (
          searchResultData.map((user, index) => (
            <NeighborListCard key={index} {...user} />
          ))
        ) : (
          <EmptyPost text={keyword + '로 검색한 결과가 없습니다.'} />
        )}
        <Threshold ref={lastElementRef} />
      </div>
    </>
  );
}