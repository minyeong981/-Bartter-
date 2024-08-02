import classnames from "classnames/bind";
import type {HTMLAttributes, PropsWithChildren} from "react";

import styles from './modalContainer.module.scss'

type ModalContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

const cx = classnames.bind(styles)

export default function ModalContainer({children, ...props}: ModalContainerProps) {
  return <div className={cx('modalContainer')} {...props}>{children}</div>
}