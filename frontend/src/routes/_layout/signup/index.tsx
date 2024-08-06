import {createFileRoute, Navigate} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/signup/')({
  component: () => <Navigate to="/signup/1" />,
});