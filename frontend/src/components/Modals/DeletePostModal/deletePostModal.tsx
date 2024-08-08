import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton';
import ModalContainer from '@/components/ModalContainer';
import Backdrop from '@/components/ModalContainer/Backdrop';

import styles from './deletePostModal.module.scss';

interface DeletePostModalProps {
  onClickOutside: VoidFunction;
  onConfirm: () => void;
}

const cx = classnames.bind(styles);

export default function DeletePostModal({
  onClickOutside,
  onConfirm
}: DeletePostModalProps) {


  return (
    <Backdrop>
      <ModalContainer onClickOutside={onClickOutside}>
        <p className={cx('text')}>
          게시글을
          <br />
          삭제하시겠습니까?
        </p>
        <div className={cx('buttonContainer')}>
          <GeneralButton
            onClick={() => onConfirm()}
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