import {useMutation} from "@tanstack/react-query";
import {useNavigate} from "@tanstack/react-router";
import classnames from 'classnames/bind';

import {IconHeart} from '@/assets/svg';
import GeneralButton from "@/components/Buttons/GeneralButton.tsx";
import LinkButton from '@/components/Buttons/LinkButton.tsx';
import barter from "@/services/barter.ts";

import styles from './chattingButtonConatiner.module.scss';

const cx = classnames.bind(styles);

interface ChattingButtonContainerProps {
  like: boolean;
  handleLike: (isLike: boolean) => void;
  isMyTrade: boolean;
  tradePostId: number;
}

export default function ChattingButtonContainer({
                                                  like,
                                                  handleLike,
                                                  isMyTrade,
                                                  tradePostId,
                                                }: ChattingButtonContainerProps) {
  const navigate = useNavigate({from:'/trade/detail'})
  const {mutate: createChatRoom} = useMutation({
    mutationFn: barter.createChatRoom,
    onSuccess: async (data)=>{
      const tradeId = data.data.data;
      await navigate({to:`/trade/chat/${tradePostId}/${tradeId}`})
    }
  })

  function handleClick() {
    handleLike(like);
  }

  function handleCreateChatRoom() {
    createChatRoom(tradePostId);
  }

  const Button = isMyTrade ? (
    <LinkButton
      buttonStyle={{style: 'primary', size: 'medium'}}
      to="/trade/chat/$tradePostId/list"
      params={{tradePostId: String(tradePostId)}}
    >
      채팅목록
    </LinkButton>
  ) : (
    <GeneralButton
      buttonStyle={{style: 'primary', size: 'medium'}}
      onClick={handleCreateChatRoom}
    >
      채팅하기
    </GeneralButton>
  );

  return (
    <nav className={cx('chattingButtonContainer')}>
      <button onClick={handleClick}>
        <IconHeart className={cx('heart', {like})}/>
      </button>
      {Button}
    </nav>
  );
}