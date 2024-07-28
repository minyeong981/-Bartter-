import type {LinkProps} from '@tanstack/react-router';
import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import style from './button.module.scss';

type LinkButtonProps = LinkProps & ButtonStyle;

const cx = classnames.bind(style);

export default function GeneralButton({
  children,
  buttonStyle,
  disabled,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cx(['button', {disabled}, ...Object.values(buttonStyle)])}
      {...props}
    >
      {children}
    </Link>
  );
}