import classnames from 'classnames/bind';

import {IconHeart} from '@/assets/svg';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';

import styles from './chattingButtonConatiner.module.scss';

const cx = classnames.bind(styles);

interface ChattingButtonContainerProps {
  like: boolean;
  handleLike: (isLike:boolean) => void;
}

export default function ChattingButtonContainer({like, handleLike}: ChattingButtonContainerProps) {

  function handleClick(){
    handleLike(like)
  }

  return (
    <nav className={cx('chattingButtonContainer')}>
      <button onClick={handleClick}>
        <IconHeart className={cx('heart', {like})}/>
      </button>
      <GeneralButton buttonStyle={{style: 'primary', size: 'medium'}}>
        채팅하기
      </GeneralButton>
    </nav>
  );
}