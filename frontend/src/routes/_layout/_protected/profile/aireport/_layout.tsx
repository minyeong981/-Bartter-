import { createFileRoute, Outlet } from '@tanstack/react-router';
import classnames from 'classnames/bind';

import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import { LabelProvider, useLabel } from '@/context/AiReportContext';

import styles from './aireport.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/profile/aireport/_layout')({
  component: AiReportLayout,
});

export default function AiReportLayout() {
  return (
    <LabelProvider>
      <div className={cx('aireportLayout')}>
        <Header />
        <Outlet />
      </div>
    </LabelProvider>
  );
}

function Header() {
  const { label } = useLabel();
  return <HeaderWithLabelAndBackButton label={label} />;
}
