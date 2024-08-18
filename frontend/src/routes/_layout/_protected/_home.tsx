import {useSuspenseQuery} from '@tanstack/react-query';
import {createFileRoute, Outlet} from '@tanstack/react-router';

import HeaderWithLabelAndButtons from '@/components/Header/HeaderWithLabelAndButtons';
import Location from '@/components/Header/Location';
import MenuBar from '@/components/MenuBar/MenuBar';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from './home.module.scss';

export const Route = createFileRoute('/_layout/_protected/_home')({
  component: Home,
});

export default function Home() {
  const userId: UserId = useRootStore(state => state.userId);
  const {data} = useSuspenseQuery({
    queryKey: [querykeys.LOCATION, userId],
    queryFn: () => barter.getUserLocation(userId),
  });

  const location = data.data.data;

  return (
    <div className={styles.home}>
      <HeaderWithLabelAndButtons
        label={
          <Location
            location={location.name.split(' ').slice(2, 3).toString()}
          />
        }
      />
      <Outlet />
      <MenuBar />
    </div>
  );
}