import classnames from "classnames/bind";
import type {HTMLAttributes} from "react";
import {forwardRef} from "react";

import styles from './trashold.module.scss'

const cx = classnames.bind(styles)


type ThresholdProps = HTMLAttributes<HTMLDivElement>



const Threshold = forwardRef<HTMLDivElement,ThresholdProps>( (props, ref) => {
  return (
    <div {...props} ref={ref} className={cx('threshold')} />
  );
})

export default Threshold