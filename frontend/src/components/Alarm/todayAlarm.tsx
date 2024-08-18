import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import classnames from 'classnames/bind';
import { useState } from 'react';

import TodayAlarmOut from '@/assets/image/todayAlarmOut.png';
import barter from '@/services/barter';
import querykeys from '@/util/querykeys';

import styles from './todayAlarm.module.scss';

const cx = classnames.bind(styles);

export default function TodayAlarm() {
  const { data } = useSuspenseQuery({
    queryKey: [querykeys.DAILY_TIP],
    queryFn: () => barter.getDailyTip()
  });

  const [isVisible, setIsVisible] = useState(true);

  const mutation = useMutation({
    mutationFn: () => barter.deleteDailyTip(),
    onSuccess: () => {
      setIsVisible(false);
    },
    onError: (error) => {
      console.error('하루 알리미 삭제에 실패했습니다:', error);
    }
  });

  const hideTodayAlarmForDay = () => {
    mutation.mutate();
  };

  // data.data.data가 빈 문자열이면 alarm-content를 숨김
  const shouldShowContent = data.data.data !== '';

  if (!isVisible || !shouldShowContent) {
    return null;
  }

  return (
    <div className={cx('todayAlarm')}>
      <div className={cx('alarmContent')}>
        <p>💡 오늘의 정보!</p>
        {data.data.data}
      </div>
      <div className={cx('alarmActions')}>
        <button onClick={hideTodayAlarmForDay}>오늘 하루 안 보기</button>
        <button onClick={() => setIsVisible(false)}>
          <img src={TodayAlarmOut} alt="Close" className={cx('closeIcon')} />
        </button>
      </div>
    </div>
  );
}
