import type {LinkProps} from '@tanstack/react-router';
import {Link} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import style from './button.module.scss';

type LinkButtonProps = LinkProps & ButtonStyle & {
  search? : {
    sortBy? : string;
    [key:string]: any;
  }
}

const cx = classnames.bind(style);

export default function LinkButton({
  children,
  buttonStyle,
  disabled,
  search,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cx(['button', {disabled}, ...Object.values(buttonStyle)])}
      {...props}
      search={search}
    >
      {children}
    </Link>
  );
}