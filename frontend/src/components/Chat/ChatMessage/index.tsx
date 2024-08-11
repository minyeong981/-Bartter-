import classnames from 'classnames/bind';

import styles from './chatMessage.module.scss';

type ChatMessageProps = ChatMessage & {mine: boolean};

const cx = classnames.bind(styles);

export default function ChatMessage({
  senderNickname,
  content,
  mine,
}: ChatMessageProps) {
  return (
    <>
      {!mine && <span>{senderNickname}</span>}
      <div className={cx('message', {mine})}>{content}</div>
    </>
  );
}