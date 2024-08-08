import { createFileRoute } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import styles from './detail.module.scss';

const cx = classnames.bind(styles);

interface ReportState {
  reportId: number;
  cropImage: string;
  cropNickname: string;
  week: number;
}

function ProfileAiReportDetail() {
  const state = window.history.state as { entry: ReportState };

  if (!state || !state.entry) {
    return <div>데이터를 불러오지 못했습니다.</div>;
  }

  const { cropImage, cropNickname, week } = state.entry;

  return (
    <div className={cx('container')}>
      <h1>{cropNickname}의 재배 요약 보고서 - {week}주차</h1>
      <img src={cropImage} alt="Crop" className={cx('cropImage')} />
      <p>상세 내용</p>
    </div>
  );
}


export const Route = createFileRoute('/_layout/_protected/profile/aireport/detail/$reportId')({
  component: ProfileAiReportDetail,
});

export default ProfileAiReportDetail;
