import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabeledBackButtonAndMenu from '../components/Header/HeaderWithLabeledBackButtonAndMenu.tsx';
import Navigation from '../components/Navigation';
import classes from '../styles/layout/rootLayout.module.scss';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <div className={classes.layout}>
      <HeaderWithLabeledBackButtonAndMenu label="버튼" />
      <Outlet />
      <Navigation />
    </div>
  );
}