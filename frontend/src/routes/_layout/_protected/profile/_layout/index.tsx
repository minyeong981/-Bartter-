import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute} from '@tanstack/react-router'
import classnames from 'classnames/bind'

import GeneralButton from "@/components/Buttons/GeneralButton.tsx";
import SettingLinkButton from '@/components/Buttons/SettingLinkButton.tsx';
import ProfileInfo from '@/components/User/ProfileInfo';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './../profile.module.scss'

const cx = classnames.bind(styles)
export const Route = createFileRoute('/_layout/_protected/profile/_layout/')({
  component: MyProfile,
});

export default function MyProfile() {
  const userId: UserId = useRootStore(state => state.userId);
  const logout = useRootStore(state => state.logout);

  const {data} = useSuspenseQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId)),
  });

  async function handleLogout() {
    try {
      await barter.logout();
      await barter.deleteFcmToken();
    } finally {
      sessionStorage.clear();
      logout();
    }
  }

  if (!userId) {
    return <div>유정 정보가 없습니다. 다시 로그인 해주세요.</div>;
  }

  const userData = data?.data?.data || [];

  return (
    <div>
      <ProfileInfo {...userData} isMe={true}/>
      <SettingLinkButton to="/profile/aireport">
      📝 AI 요약보고서</SettingLinkButton>
      <SettingLinkButton
        to="/profile/$userId/cropStorage"
        params={{userId: userId.toString()}}
      >
      🧰 농작물 창고</SettingLinkButton>
      <SettingLinkButton
        to="/profile/$userId/diary"
        params={{userId: userId.toString()}}
      >
      🌳  농사 일지</SettingLinkButton>
      <SettingLinkButton to="/profile/writed">
      ✍🏻 내가 쓴 글</SettingLinkButton>
      <SettingLinkButton to="/profile/picked">🛒 찜 목록</SettingLinkButton>
      <SettingLinkButton to="/profile/chat">💬 채팅 목록</SettingLinkButton>
      <SettingLinkButton to="/profile/changelocation">🚩 위치 수정</SettingLinkButton>
      <div className={cx('logoutBox')}>
      <GeneralButton 
      buttonStyle={{style: 'floating', size: 'small'}} 
      onClick={handleLogout}
      >로그아웃
      </GeneralButton>
      </div>
    </div>
  );
}