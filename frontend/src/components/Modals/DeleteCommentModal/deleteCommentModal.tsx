import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton';
import ModalContainer from '@/components/ModalContainer';
import Backdrop from '@/components/ModalContainer/Backdrop';

import styles from './deleteCommentModal.module.scss';

interface DeleteCommentModalProps {
  onClickOutside: VoidFunction;
  onConfirm: () => void;
}

const cx = classnames.bind(styles);

export default function DeleteCommentModal({
  onClickOutside,
  onConfirm,
}: DeleteCommentModalProps) {


  return (
    <Backdrop>
      <ModalContainer onClickOutside={onClickOutside}>
        <p className={cx('text')}>
          댓글을
          <br />
          삭제하시겠습니까?
        </p>
        <div className={cx('buttonContainer')}>
          <GeneralButton
            onClick={() => onConfirm() }
            buttonStyle={{style: 'mono', size: 'tiny'}}
          >
            삭제
          </GeneralButton>
          <GeneralButton
            onClick={onClickOutside}
            buttonStyle={{style: 'primary', size: 'tiny'}}
          >
            취소
          </GeneralButton>
        </div>
      </ModalContainer>
    </Backdrop>
  );
}