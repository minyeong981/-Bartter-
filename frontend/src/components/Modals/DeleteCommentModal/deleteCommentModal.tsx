import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton';
import ModalContainer from '@/components/ModalContainer';
import Backdrop from '@/components/ModalContainer/Backdrop';
import useRootStore from '@/store';

import styles from './deleteCommentModal.module.scss';

interface DeleteCommentModalProps {
  onClickOutside: VoidFunction;
  postId : number
  commentId : number
}

const cx = classnames.bind(styles);

export default function DeleteCommentModal({
  onClickOutside,
  postId,
  commentId
}: DeleteCommentModalProps) {

    const deleteComment = useRootStore(state => state.deleteComment)

    function handleClick(postId : number, commentId : number) {
        deleteComment(postId, commentId)
        console.log(postId, commentId)
        onClickOutside()

    }

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
            onClick={() => handleClick(postId, commentId)}
            buttonStyle={{style: 'mono', size: 'tiny'}}
          >
            네
          </GeneralButton>
          <GeneralButton
            onClick={onClickOutside}
            buttonStyle={{style: 'primary', size: 'tiny'}}
          >
            아니요
          </GeneralButton>
        </div>
      </ModalContainer>
    </Backdrop>
  );
}