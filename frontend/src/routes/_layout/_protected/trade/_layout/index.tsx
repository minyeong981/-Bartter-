import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import CropSelector from '@/components/CropSelector';
import TradeCard from '@/components/TradeCard';
import useInfiniteScroll from '@/hooks/useInfiniteScroll.tsx';
import barter from '@/services/barter.ts';

export const Route = createFileRoute('/_layout/_protected/trade/_layout/')({
  component: TradeListPage,
});

function TradeListPage() {
  const {data, fetchNextPage} = useSuspenseInfiniteQuery({
    queryKey: ['tradeList'],
    queryFn: ({pageParam}) => barter.getTradePostList(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (_, allPages, lastPageParam) => {
      if (allPages.length % 10 !== 0) return null;
      return lastPageParam + 1;
    },
  });
  const {rootElementRef, lastElementRef} = useInfiniteScroll(fetchNextPage);

  const tradeList = data.pages.map(page => page.data.data).flat();

  return (
    <>
      <CropSelector from="모두" to="모두" />
      <div ref={rootElementRef}>
        {!!tradeList.length &&
          tradeList.map(trade => (
            <TradeCard key={trade.cropTradePostId} {...trade} />
          ))}
        <div ref={lastElementRef} />
      </div>
    </>
  );
}