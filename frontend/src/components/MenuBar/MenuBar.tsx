import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Lottie from 'react-lottie-player';

import Community from '@/assets/lottie/community.json';
import Diary from '@/assets/lottie/diary.json';
import Home from '@/assets/lottie/home.json';
import Trade from '@/assets/lottie/trade.json';

import styles from './menuBar.module.scss';

export default function MenuBar() {
  const [isPlayingHome, setPlayingHome] = useState(false);
  const [isPlayingDiary, setPlayingDiary] = useState(false);
  const [isPlayingTrade, setPlayingTrade] = useState(false);
  const [isPlayingCommunity, setPlayingCommunity] = useState(false);

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link to="/">
            <Lottie
              loop
              animationData={Home}
              play={isPlayingHome}
              className={styles.lottie}
              onMouseEnter={() => setPlayingHome(true)}
              onMouseLeave={() => setPlayingHome(false)}
            />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to="/diary">
            <Lottie
              loop
              animationData={Diary}
              play={isPlayingDiary}
              className={styles['lottie']}
              onMouseEnter={() => setPlayingDiary(true)}
              onMouseLeave={() => setPlayingDiary(false)}
            />
            <span>농사 일지</span>
          </Link>
        </li>
        <li>
          <Link to="/trade">
            <Lottie
              loop
              animationData={Trade}
              play={isPlayingTrade}
              className={styles.lottie}
              onMouseEnter={() => setPlayingTrade(true)}
              onMouseLeave={() => setPlayingTrade(false)}
            />
            <span>물물 교환</span>
          </Link>
        </li>
        <li>
          <Link to="/community">
            <Lottie
              loop
              animationData={Community}
              play={isPlayingCommunity}
              className={styles.lottie}
              onMouseEnter={() => setPlayingCommunity(true)}
              onMouseLeave={() => setPlayingCommunity(false)}
            />
            <span>동네 모임</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
