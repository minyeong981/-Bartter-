import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from '@tanstack/react-query';
import {createFileRoute, Outlet} from '@tanstack/react-router';
import {useState} from 'react';

import ChatInfoCard from '@/components/Chat/ChatInfoCard';
import CompleteTradeModal from '@/components/Chat/Modal/CompleteTradeModal';
import ConfirmCompleteModal from '@/components/Chat/Modal/ConfirmCompleteModal';
import MakeReservationModal from '@/components/Chat/Modal/MakeReserveModal';
import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons.tsx';
import barter from '@/services/barter.ts';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys.ts';

export const Route = createFileRoute(
  '/_layout/_protected/trade/chat/$tradePostId/_room',
)({
  component: ChatLayout,
});

function ChatLayout() {
  const queryClient = useQueryClient();
  const userId = useRootStore(state => state.userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {tradePostId, tradeId}: { tradePostId: string, tradeId: string } = Route.useParams();
  const {data} = useSuspenseQuery({
    queryFn: () => barter.getChatRoomInfo(Number(tradePostId), Number(tradeId)),
    queryKey: ['trade', 'chat', tradePostId, tradeId],
  });

  const {mutate: changeToProgress} = useMutation({
    mutationFn: barter.putTradeProgress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['trade', 'chat']});
    },
  });
  const {mutate: changeToReservation} = useMutation({
    mutationFn: barter.putTradeReservation,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['trade', 'chat']});
    },
  });
  const {mutate: changeToComplete} = useMutation({
    mutationFn: barter.putTradeComplete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['trade', 'chat']});
    },
  });

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleCancelReservation() {
    changeToProgress(Number(tradePostId));
    setIsModalOpen(false);
  }

  function handleReservation() {
    changeToReservation(Number(tradePostId));
    setIsModalOpen(false);
  }

  function handleCompleteTrade() {
    changeToComplete(Number(tradePostId));
  }

  async function handleConfirmComplete() {
    setIsModalOpen(false);
    await navigate({to: '/trade'});
  }

  const chatRoomInfo = data[0].data.data.data;
  const locationName = data[1].data.data.data.name
    .split(' ')
    .slice(2, 3)
    .join();

  const Modal = {
    PROGRESS: (
      <MakeReservationModal
        onClickOutside={handleCloseModal}
        onClickReservation={handleReservation}
      />
    ),
    RESERVED: (
      <CompleteTradeModal
        handleClickOutside={handleCloseModal}
        handleClickCancel={handleCancelReservation}
        handleClickComplete={handleCompleteTrade}
      />
    ),
    COMPLETED: (
      <ConfirmCompleteModal
        onClickOutside={handleCloseModal}
        onClickReservation={handleConfirmComplete}
      />
    ),
  }[chatRoomInfo.simpleTradePostDetail.status];

  return (
    <>
      <HeaderWithLabelAndButtons label="장덕동"/>
      <ChatInfoCard {...chatRoomInfo} onClick={handleOpenModal}/>
      <Outlet/>
      {isModalOpen && Modal}
    </>
  );
}