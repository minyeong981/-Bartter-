import { useEffect, useState } from 'react';

import TodayAlarmOut from '@/assets/image/todayAlarmOut.png';

import styles from './TodayAlarm.module.scss';

interface TodayAlarmProps {
  hasDiaryEntry: boolean;
}

const TodayAlarm = ({ hasDiaryEntry }: TodayAlarmProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isHidden = localStorage.getItem('hideTodayAlarm');
    if (isHidden) {
      const hiddenUntil = new Date(isHidden);
      if (hiddenUntil > new Date()) {
        setIsVisible(false);
      } else {
        localStorage.removeItem('hideTodayAlarm');
      }
    }
  }, []);

  const hideTodayAlarmForDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem('hideTodayAlarm', tomorrow.toISOString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles['today-alarm']}>
      <div className={styles['alarm-content']}>
        {hasDiaryEntry ? (
          <p>오늘의 일지가 작성되었습니다.</p>
        ) : (
          <>
            <p>💡 오늘의 정보!</p>
            <p>아직 작성된 일지가 없습니다.</p>
          </>
        )}
      </div>
      <div className={styles['alarm-actions']}>
        <button onClick={hideTodayAlarmForDay}>오늘 하루 안 보기</button>
        <button onClick={() => setIsVisible(false)}>
          <img src={TodayAlarmOut} alt="Close" className={styles['close-icon']} />
        </button>
      </div>
    </div>
  );
};

export default TodayAlarm;
