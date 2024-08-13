import classNames from 'classnames';
import type {HTMLAttributes} from 'react';

import styles from './status.module.scss';

interface StatusProps extends HTMLAttributes<HTMLDivElement> {
  status: Status;
}

const cx = classNames;

const Text: Record<Status, string | null> = {
  PROGRESS: '예약중',
  COMPLETED: '완료',
  RESERVED: null,
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