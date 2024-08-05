import classnames from 'classnames/bind';
import {useState} from 'react';

import {IconHeart} from '@/assets/svg';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';

import styles from './chattingButtonConatiner.module.scss';

const cx = classnames.bind(styles);

export default function ChattingButtonContainer() {
  const [dib, setDib] = useState(false);

  function handleClickDip() {
    setDib(prev => !prev);
  }

  return (
    <nav className={cx('chattingButtonContainer')}>
      <button onClick={handleClickDip}>
        <IconHeart className={cx('heart', {dib})} />
      </button>
      <GeneralButton buttonStyle={{style: 'primary', size: 'medium'}}>
        채팅하기
      </GeneralButton>
    </nav>
  );
}