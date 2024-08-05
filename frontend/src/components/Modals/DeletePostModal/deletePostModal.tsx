import { useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import GeneralButton from '@/components/Buttons/GeneralButton';
import ModalContainer from '@/components/ModalContainer';
import Backdrop from '@/components/ModalContainer/Backdrop';
import useRootStore from '@/store';

import styles from './deletePostModal.module.scss';

interface DeletePostModalProps {
  onClickOutside: VoidFunction;
  postId : number
}

const cx = classnames.bind(styles);

export default function DeletePostModal({
  onClickOutside,
  postId
}: DeletePostModalProps) {

  const nav = useNavigate({from : '/community/detail/$postId'})

  const deletePost = useRootStore(state => state.deletePost)

    function handleClick(postId : number) {
        console.log('delete Post', postId)
        deletePost(postId)
        nav({to:'/community'})
    }

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
            onClick={() => handleClick(postId)}
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