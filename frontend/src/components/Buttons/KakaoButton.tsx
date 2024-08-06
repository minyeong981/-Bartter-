import classnames from 'classnames/bind';

import {IconKakao} from '@/assets/svg';

import styles from './button.module.scss';

const cx = classnames.bind(styles);

export default function KakaoButton() {
  return (
    <button className={cx(['kakao', 'large'])}>
      <IconKakao />
      카카오로 시작하기
    </button>
  );
}