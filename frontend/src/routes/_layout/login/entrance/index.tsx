import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {ImageLogo} from '@/assets/image';
import KakaoButton from '@/components/Buttons/KakaoButton.tsx';
import GeneralButton from '@/components/Buttons/LinkButton.tsx';

import styles from './entrance.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/login/entrance/')({
  component: EntrancePage,
});

function EntrancePage() {
  function handleKakaoButton() {
    window.open(import.meta.env.BASEURL + '/oauth2/authorization/kakao', '_self');
  }

  return (
    <div className={cx('entrance')}>
      <div className={cx('logo-container')}>
        <img src={ImageLogo} alt="logo image"/>
      </div>
      <div className={cx('button-container')}>
        <KakaoButton onClick={handleKakaoButton}/>
        <GeneralButton buttonStyle={{style: 'primary', size: 'large'}} to="/login">
          로그인
        </GeneralButton>
      </div>
    </div>
  );
}