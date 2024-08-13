import Lottie from 'react-lottie-player';

import completeTradeAnimation from '@/assets/lottie/completeTrade.json';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import ModalContainer from '@/components/ModalContainer';

interface ConfirmCompleteModalProps {
  onClickOutside: () => void;
  onClickReservation: () => void;
}

export default function ConfirmCompleteModal({
  onClickOutside,
  onClickReservation,
}: ConfirmCompleteModalProps) {
  return (
    <ModalContainer onClickOutside={onClickOutside}>
      <Lottie loop play animationData={completeTradeAnimation} />
      <GeneralButton
        buttonStyle={{style: 'primary', size: 'large'}}
        onClick={onClickReservation}
      >
        메인으로 돌아가기
      </GeneralButton>
    </ModalContainer>
  );
}