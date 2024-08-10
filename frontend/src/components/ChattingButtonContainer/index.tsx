import classnames from 'classnames/bind';

import {IconHeart} from '@/assets/svg';
import LinkButton from '@/components/Buttons/LinkButton.tsx';

import styles from './chattingButtonConatiner.module.scss';

const cx = classnames.bind(styles);

interface ChattingButtonContainerProps {
  like: boolean;
  handleLike: (isLike: boolean) => void;
  tradeId: number;
  isMyTrade: boolean;
}

export default function ChattingButtonContainer({
  like,
  handleLike,
  tradeId,
  isMyTrade,
}: ChattingButtonContainerProps) {
  function handleClick() {
    handleLike(like);
  }

  const Button = isMyTrade ? (
    <LinkButton
      buttonStyle={{style: 'primary', size: 'medium'}}
      to="/trade/chat/list"
    >
      채팅목록
    </LinkButton>
  ) : (
    <LinkButton
      buttonStyle={{style: 'primary', size: 'medium'}}
      to="/trade/chat/$tradeId"
      params={{tradeId: String(tradeId)}}
    >
      채팅하기
    </LinkButton>
  );

  return (
    <nav className={cx('chattingButtonContainer')}>
      <button onClick={handleClick}>
        <IconHeart className={cx('heart', {like})} />
      </button>
      {Button}
    </nav>
  );
}