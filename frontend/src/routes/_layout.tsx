import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabelAndMenu from '../components/Header/HeaderWithLabelAndMenu.tsx';
import Navigation from '../components/Navigation';
import classes from '../styles/layout/rootLayout.module.scss';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <div className={classes.layout}>
      <HeaderWithLabelAndMenu label="레이아웃" />
      <Outlet />
      <Navigation />
    </div>
  );
}