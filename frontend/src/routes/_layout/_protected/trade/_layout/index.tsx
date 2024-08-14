import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import CropSelector from '@/components/CropSelector';
import EmptyPost from '@/components/Empty/EmptyPost.tsx';
import Threshold from '@/components/Threshold';
import TradeCard from '@/components/TradeCard';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.tsx';
import barter from '@/services/barter.ts';

import styles from './trade.module.scss';

const PAGE_LIMIT = 5;

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/trade/_layout/')({
  component: TradeListPage,
});

function TradeListPage() {
  const {data, fetchNextPage} = useSuspenseInfiniteQuery({
    queryKey: ['tradeList'],
    queryFn: ({pageParam}) => barter.getTradePostList(pageParam, PAGE_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (prevPage, _, lastPageParam) => {
      if (prevPage.data.data.length === PAGE_LIMIT) return lastPageParam + 1;
    },
  });
  const {rootElementRef, lastElementRef} = useInfiniteScroll(fetchNextPage);

  const tradeList = data.pages.map(page => page.data.data).flat();

  return (
    <>
      <CropSelector from="모두" to="모두" />
      <div ref={rootElementRef} className={cx('tradeList')}>
        {tradeList.length ? (
          tradeList.map(trade => (
            <TradeCard key={trade.cropTradePostId} {...trade} />
          ))
        ) : (
          <EmptyPost text="물물교환 글이 없습니다" />
        )}
        <Threshold ref={lastElementRef} />
      </div>
    </>
  );
}