import classnames from 'classnames/bind';
import type {ButtonHTMLAttributes} from 'react';

import {IconKakao} from '@/assets/svg';

import styles from './button.module.scss';

const cx = classnames.bind(styles);

type KakaoButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function KakaoButton(props: KakaoButtonProps) {
  return (
    <button {...props} className={cx(['kakao', 'large'])}>
      <IconKakao />
      카카오로 시작하기
    </button>
  );
}