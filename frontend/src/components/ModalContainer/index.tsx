import classnames from "classnames/bind";
import type {HTMLAttributes, PropsWithChildren} from "react";
import {useRef} from "react";

import Backdrop from "@/components/ModalContainer/Backdrop";
import useOnClickOutside from "@/hooks/useOnClickOutside.tsx";

import styles from './modalContainer.module.scss'

type ModalContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
  onClickOutside: VoidFunction;
}

const cx = classnames.bind(styles)

export default function ModalContainer({children, onClickOutside, ...props}: ModalContainerProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onClickOutside);

  return <Backdrop>
    <div className={cx('modalContainer')} ref={modalRef} {...props}>{children}</div>
  </Backdrop>
}