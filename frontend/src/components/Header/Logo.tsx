import classnames from 'classnames/bind';

import logoImage from '@/assets/image/logo.png';  // 변수 이름 변경

import styles from './header.module.scss';

const cx = classnames.bind(styles);

export default function Logo() {
    return (
        <div className={cx('logo')}>
            <img src={logoImage} alt='Logo' className={cx('logoImage')} />
        </div>
    );
}
