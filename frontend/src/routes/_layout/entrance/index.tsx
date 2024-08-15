import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useEffect, useState} from 'react';

import Logo from '@/assets/image/logo.png';
import Onboarding from '@/components/Onboarding/Onboarding';

import styles from './entrance.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/entrance/')({
  component: EntrancePage,
});

function EntrancePage() {
  const [_, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cx('entrance')}>
      {showOnboarding ? (
        <div className={cx('logoContainer')}>
          <Onboarding onSlideChange={index => setCurrentStep(index + 1)} />
        </div>
      ) : (
        <div className={cx('logo')}>
          <img src={Logo} alt="Logo" />
        </div>
      )}
    </div>
  );
}

export default EntrancePage;