import classNames from 'classnames';
import type {HTMLAttributes, PropsWithChildren} from 'react';

import styles from './container.module.scss';

const cx = classNames;

export default function Container({className,children, ...props}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <nav {...props} className={cx(styles['header'],className)}>{children}</nav>;
}