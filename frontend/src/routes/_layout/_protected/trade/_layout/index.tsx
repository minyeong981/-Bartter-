import {useSuspenseQuery} from "@tanstack/react-query";
import {createFileRoute} from '@tanstack/react-router';

import CropSelector from '@/components/CropSelector';
import TradeCard from '@/components/TradeCard';
import barter from "@/services/barter.ts";

export const Route = createFileRoute('/_layout/_protected/trade/_layout/')({
  component: TradeListPage,
});

function TradeListPage() {
  const {data} = useSuspenseQuery({queryFn: () => barter.getTradePostList(0, 100), queryKey: ['tradeList']})
  const tradeList = data.data.data


  return (
    <>
      <CropSelector from="모두" to="모두"/>
      {tradeList.length && tradeList.map((trade) => <TradeCard key={trade.cropTradePostId} {...trade}/>)}
    </>
  );
}