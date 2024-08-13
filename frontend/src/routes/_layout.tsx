import {createFileRoute, Outlet} from '@tanstack/react-router';
import {Suspense} from 'react';

import Spinner from '@/components/Spinner';
import classes from '@/styles/layout/rootLayout.module.scss';

export const Route = createFileRoute('/_layout')({
  component: Layout,
});

function Layout() {
  return (
    <div className={classes.layout}>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
}