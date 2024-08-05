import {useState} from 'react';

import styles from './menubar.module.scss';

export default function MenuBar() {
  const [active, setActive] = useState('index');

  const handleClick = (name: string) => {
    setActive(name);
  };

  return (
    <div className={styles.bottomBar}>
      <button
        className={`${styles.iconButton} ${active === 'index' ? styles.active : ''}`}
        onClick={() => handleClick('index')}
      >
        <i className="fas fa-home" />
        <span>홈</span>
      </button>
      <button
        className={`${styles.iconButton} ${active === 'journal' ? styles.active : ''}`}
        onClick={() => handleClick('journal')}
      >
        <i className="fas fa-book" />
        <span>농사일지</span>
      </button>
      <button
        className={`${styles.iconButton} ${active === 'trade' ? styles.active : ''}`}
        onClick={() => handleClick('trade')}
      >
        <i className="fas fa-exchange-alt" />
        <span>물물교환</span>
      </button>
      <button
        className={`${styles.iconButton} ${active === 'community' ? styles.active : ''}`}
        onClick={() => handleClick('community')}
      >
        <i className="fas fa-users" />
        <span>동네모임</span>
      </button>
    </div>
  );
}