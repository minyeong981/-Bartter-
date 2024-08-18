import {createFileRoute, Navigate} from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/entrance/_public/signup/')({
  component: () => <Navigate to="/entrance/signup/1" />,
});