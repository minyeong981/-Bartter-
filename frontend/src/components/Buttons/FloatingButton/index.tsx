import classNames from "classnames";
import type {HTMLAttributes} from "react";

import styles from './floatingButton.module.scss'

type FloatingButtonProps = HTMLAttributes<HTMLButtonElement> & { children: string }

const cx = classNames

export default function FloatingButton({children,className ,...props}: FloatingButtonProps) {
  return <button {...props} className={cx(styles.floatingButton,className)}>{children}</button>
}