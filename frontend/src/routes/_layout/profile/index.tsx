import { createFileRoute } from '@tanstack/react-router'

import ProfileImage from '@/assets/image/스토리1.png'
import LinkButton from '@/components/Buttons/LinkButton'
import SettingButton from '@/components/Buttons/SettingButton'
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton'
import ProfileInfo from '@/components/User/ProfileInfo'

import styles from './index.module.scss';

const user : UserProfile = {
  userId: '김싸피',
  location: {locationId: 1, locationName:'장덕동'},
  profileImage: ProfileImage,
  nickname:'수완동 농사 삐약이',
  followingCount: 3,
  followeeCount: 12,
  profileMessage: '직장 은퇴 후 집에서 텃받을 관리하면서 삶의 즐거움을 찾고있습니다.'        
}

export const Route = createFileRoute('/_layout/profile/')({
  component: Profile
})

function Profile() {

  return (
    <div>
    { user.userId ==='김싸피' ? (
      <>
      <HeaderWithLabelAndBackButton label='내프로필' />
      <ProfileInfo {...user} /> 
      <SettingButton to='/profile/AiReport'>AI 요약보고서</SettingButton>
      <SettingButton to='/profile/$nickname/cropStorage' params={{nickname: '민영'}}>농작물 창고</SettingButton>
      <SettingButton to='/profile/$nickname/diary' params={{nickname: '민영'}} >농사 일지</SettingButton>
      <SettingButton to='/profile/writed'>내가 쓴 글</SettingButton>
      <SettingButton to='/profile/picked'>찜 목록</SettingButton>
      <SettingButton to='/profile/chat'>채팅 목록</SettingButton>
      <SettingButton to='/profile/changelocation'>위치 수정</SettingButton>
      <SettingButton to='/community'>로그아웃</SettingButton>
      </>
      )  : 
      (
      <>
      <HeaderWithLabelAndBackButton label='프로필' />
      <ProfileInfo {...user} />
      <div className={styles.cropsCount}>받은 농작물 {6} 개</div>
      <SettingButton to='/profile/$nickname/cropStorage' params={{nickname: '민영'}} >농작물 창고</SettingButton>
      <SettingButton to='/profile/$nickname/diary' params={{nickname: '민영'}} >농사 일지</SettingButton>
      </>
      )
    }
    </div>
  )
}
