import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import ModalContainer from '@/components/ModalContainer';

import styles from './completeTradeModal.module.scss';

interface CompleteTradeModalProps {
  handleClickOutside: () => void;
  handleClickCancel: () => void;
  handleClickComplete: () => void;
}

const cx = classnames.bind(styles);

export default function CompleteTradeModal({
  handleClickOutside,
  handleClickCancel,
  handleClickComplete,
}: CompleteTradeModalProps) {
  return (
    <ModalContainer onClickOutside={handleClickOutside}>
      <p className={cx('text')}>
        물물교환을
        <br />
        완료하시겠습니까?
      </p>
      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'mono', size: 'small'}}
          onClick={handleClickCancel}
        >
          예약취소
        </GeneralButton>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'small'}}
          onClick={handleClickComplete}
        >
          완료하기
        </GeneralButton>
      </div>
    </ModalContainer>
  );
}