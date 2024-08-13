import classNames from 'classnames';
import type {HTMLAttributes} from 'react';

import styles from './status.module.scss';

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  status: Status;
}

const cx = classNames;

const Text: Record<Status, string | null> = {
  PROGRESS: null,
  COMPLETED: '완료',
  RESERVED: '예약중',
};

export default function Status({status, className, ...props}: StatusProps) {
  const text = Text[status];
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
