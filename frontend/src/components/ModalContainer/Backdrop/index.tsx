import classnames from "classnames/bind";
import type {HTMLAttributes, PropsWithChildren} from "react";

import styles from './backdrop.module.scss'

const cx = classnames.bind(styles)

type BackdropProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export default function Backdrop({children,...props}:BackdropProps){
  return <div {...props} className={cx('backdrop')}>{children}</div>
}