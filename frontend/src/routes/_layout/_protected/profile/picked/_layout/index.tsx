import {useQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router';

import EmptyPicked from '@/components/Empty/EmptyPicked';
import TradeCard from '@/components/TradeCard';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './../picked.module.scss';

export const Route = createFileRoute(
  '/_layout/_protected/profile/picked/_layout/',
)({
  component: ProfilePicked,
});

export default function ProfilePicked() {
  const userId = useRootStore(state => state.userId);

  const page = 0;
  const limit = 100;

  const {data} = useQuery({
    queryKey: [querykeys.TRADE_LIST, userId, page, limit],
    queryFn: () => barter.getPickedTradePostList(userId, 0, 10),
  });

  const pickedPosts = data?.data.data || [];
  console.log(pickedPosts);

  return (
  <div>
    { pickedPosts.length===0 ? (
      <div>
        <EmptyPicked />
      </div>
        
    ) : (
      <div className={styles.pickedContainer}>
        {pickedPosts.map((trade, index) => 
        <TradeCard key={index} {...trade} />
        )}
      </div>
     )}
  </div>
  )
}