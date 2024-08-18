import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './chatMessage.module.scss';

type ChatMessageProps = ChatMessage & {mine: boolean} & {senderId : UserId};

const cx = classnames.bind(styles);

export default function ChatMessage({
  senderNickname,
  content,
  mine,
  senderId,
}: ChatMessageProps) {

  const { data } = useSuspenseQuery({
  queryKey: [querykeys.PROFILE, senderId],
  queryFn: () => barter.getUserProfile(Number(senderId)),
  });

  const profileImage = data?.data?.data.profileImage || '';

  return (
    <>
      {!mine && <div className={styles.senderInfo}>
        <div className={cx('senderImage')} >
          <Link to={`/profile/${senderId}`} ><img src={profileImage} alt="" /></Link>
          </div>
          <div className={cx('textContainer')}>
        <div className={cx('senderNickname')}>{senderNickname}</div>
        <div className={cx('message')}>{content}</div>
        </div>
        </div>}
      { mine && <div className={cx('message', {mine})}>{content}</div>}
    </>
  );
}