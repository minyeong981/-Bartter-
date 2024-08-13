import { Link, useLocation } from '@tanstack/react-router';
import { useEffect,useState } from 'react';
import Lottie from 'react-lottie-player';

import Community from '@/assets/lottie/community.json';
import Diary from '@/assets/lottie/diary.json';
import Home from '@/assets/lottie/home.json';
import Trade from '@/assets/lottie/trade.json';

import styles from './menubar.module.scss';

export default function MenuBar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(location.pathname);

  useEffect(() => {
    
    const currentPath = location.pathname;
    if (currentPath === '/') {
      setActiveItem('home');
    } else if (currentPath === '/diary') {
      setActiveItem('diary');
    } else if (currentPath === '/trade') {
      setActiveItem('trade');
    } else if (currentPath === '/community') {
      setActiveItem('community');
    }
  }, [location.pathname]);

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link 
            to="/" 
            className={activeItem === 'home' ? styles.active : ''} 
          >
            <Lottie
              loop
              animationData={Home}
              play={activeItem === 'home'}
              className={styles.lottie}
            />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/diary"
            className={activeItem === 'diary' ? styles.active : ''}  
          >
            <Lottie
              loop
              animationData={Diary}
              play={activeItem === 'diary'}
              className={styles.lottie}
            />
            <span>농사 일지</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/trade"
            className={activeItem === 'trade' ? styles.active : ''}  
          >
            <Lottie
              loop
              animationData={Trade}
              play={activeItem === 'trade'}
              className={styles.lottie}
            />
            <span>물물 교환</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/community"
            className={activeItem === 'community' ? styles.active : ''} 
          >
            <Lottie
              loop
              animationData={Community}
              play={activeItem === 'community'}
              className={styles.lottie}
            />
            <span>동네 모임</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
