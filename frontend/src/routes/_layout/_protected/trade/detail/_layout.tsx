import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {createFileRoute, Outlet} from '@tanstack/react-router';
import {createContext} from 'react';

import ChattingButtonContainer from '@/components/Chat/ChattingButtonContainer';
import HeaderWithBackButton from '@/components/Header/HeaderWithBackButton.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';

const DEFAULT_TRADE_DETAIL: TradePostDetail = {
  imageList: [],
  title: '',
  location: {locationId: 0, name: ''},
  createdAt: '',
  tradePostId: 0,
  isShare: false,
  content: '',
  author: {userId: 0, nickname: '', profileImage: ''},
  hasCrop: false,
  isLike: false,
  cropId: 0,
  desiredCategoryList: [],
};

export const TradeContext =
  createContext<TradePostDetail>(DEFAULT_TRADE_DETAIL);

export const Route = createFileRoute(
  '/_layout/_protected/trade/detail/_layout',
)({
  component: TradeDetailLayout,
});

function TradeDetailLayout() {
  const queryClient = useQueryClient();
  const userId = useRootStore(state => state.userId);
  const {tradePostId}: {tradePostId: number} = Route.useParams();
  const {data} = useSuspenseQuery({
    queryKey: ['trade', tradePostId],
    queryFn: () => barter.getTradePostDetail(tradePostId),
  });
  const tradePostDetailData = data.data.data;

  const isMyTrade =
    Number(tradePostDetailData.author.userId) === Number(userId);

  const {mutate: like} = useMutation({
    mutationFn: barter.likeTradePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trade'],
      });
    },
  });
  const {mutate: unLike} = useMutation({
    mutationFn: barter.unLikeTradePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['trade'],
      });
    },
  });

  function handleLike(isLike: boolean) {
    if (isLike) {
      unLike(tradePostDetailData.tradePostId);
    } else {
      like(tradePostDetailData.tradePostId);
    }
  }

  return (
    <>
      <HeaderWithBackButton />
      <TradeContext.Provider value={tradePostDetailData}>
        <Outlet />
      </TradeContext.Provider>
      <ChattingButtonContainer
        like={tradePostDetailData.isLike}
        handleLike={handleLike}
        isMyTrade={isMyTrade}
        tradePostId={tradePostDetailData.tradePostId}
      />
    </>
  );
}