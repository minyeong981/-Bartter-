import {createFileRoute, Outlet} from '@tanstack/react-router';

import classes from '@/styles/layout/rootLayout.module.scss';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
}