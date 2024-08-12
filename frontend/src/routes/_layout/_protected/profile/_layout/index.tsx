import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute} from '@tanstack/react-router'
import classnames from 'classnames/bind'

import LinkButton from '@/components/Buttons/LinkButton';
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
  const userId : UserId = useRootStore(state => state.userId);
  // const logout = useRootStore(state => state.logout);
  // const navigate = Route.useNavigate();
  console.log(userId);


  const { data } = useSuspenseQuery({
    queryKey: [querykeys.PROFILE, userId],
    queryFn: () => barter.getUserProfile(Number(userId)),
  });

  if ( !userId ) {
    return <div>유정 정보가 없습니다. 다시 로그인 해주세요.</div>
  }

  const userData = data?.data?.data || [];

  return (
    <div>
    <ProfileInfo {...userData} isMe={true}/>
    <SettingLinkButton to="/profile/aireport" text='AI 요약보고서'/>
    <SettingLinkButton
      to="/profile/$userId/cropStorage"
      params={{userId: userId.toString()}}
      text='농작물 창고'
    />
    <SettingLinkButton
      to="/profile/$userId/diary"
      params={{userId: userId.toString()}}
      text='농사 일지'
    />
    <SettingLinkButton to="/profile/writed" text='내가 쓴 글'/>
    <SettingLinkButton to="/profile/picked" text='찜 목록'/>
    <SettingLinkButton to="/profile/chat" text='채팅 목록'/>
    <SettingLinkButton to="/profile/changelocation" text='위치 수정'/>
    <div className={cx('logoutButton')}>
    <LinkButton buttonStyle={ { style: 'floating', size:'medium'}} >로그아웃</LinkButton>
    </div>
    </div>
  );
}