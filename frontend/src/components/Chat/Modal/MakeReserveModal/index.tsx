import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import ModalContainer from '@/components/ModalContainer';

interface MakeReservationModalProps {
  onClickOutside: () => void;
  onClickReservation: () => void;
}

export default function MakeReservationModal({
  onClickOutside,
  onClickReservation,
}: MakeReservationModalProps) {
  return (
    <ModalContainer onClickOutside={onClickOutside}>
      <p style={{textAlign: 'center'}}>
        물물교환을
        <br />
        예약하시겠습니까?
      </p>
      <GeneralButton
        buttonStyle={{style: 'primary', size: 'large'}}
        onClick={onClickReservation}
      >
        예약하기
      </GeneralButton>
    </ModalContainer>
  );
}