import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/signup/_layout')({
  component: () => <Outlet />,
});