import classnames from 'classnames/bind';
import type {HTMLAttributes, PropsWithChildren} from 'react';

import styles from './heading.module.scss';

const cx = classnames.bind(styles);

export default function Heading({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p className={cx('heading')} {...props}>
      {children}
    </p>
  );
}