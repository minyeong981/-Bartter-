import classNames from 'classnames';
import type {HTMLAttributes} from 'react';

import styles from './status.module.scss';

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  status: Status;
}

const cx = classNames;

const Text: Record<Status, string | null> = {
  IN_PROGRESS: '예약중',
  COMPLETED: '완료',
  NEW: null,
};

export default function Status({status, className, ...props}: StatusProps) {
  const text = Text[status];
  console.log('text', text);
  if (!text) return;

  return (
    <div
      {...props}
      className={cx(styles.status, className, {
        [styles.completed]: text === '완료',
      })}
    >
      {text}
    </div>
  );
}