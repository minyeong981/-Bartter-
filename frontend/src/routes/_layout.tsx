import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithBackButton from '../components/Header/HeaderWithBackButton.tsx';
import Navigation from '../components/Navigation';
import classes from '../styles/layout/rootLayout.module.scss';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <div className={classes.layout}>
      <HeaderWithBackButton />
      <Outlet />
      <Navigation />
    </div>
  );
}