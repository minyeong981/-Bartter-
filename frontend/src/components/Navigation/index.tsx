import {Link} from '@tanstack/react-router';

import {ImageBarter, ImageDiary, ImageGroup, ImageHome} from '@/assets/image';

import styles from './navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link to="/">
            <img src={ImageHome} alt="홈" />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/diary">
            <img src={ImageDiary} alt="농사일지" />
            <span>농사일지</span>
          </Link>
        </li>
        <li>
          <Link to="/trade">
            <img src={ImageBarter} alt="물물 교환" />
            <span>물물 교환</span>
          </Link>
        </li>
        <li>
          <Link to="/community">
            <img src={ImageGroup} alt="동네 모임" />
            <span>동네 모임</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}