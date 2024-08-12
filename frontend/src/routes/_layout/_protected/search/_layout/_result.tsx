import {useSuspenseQuery} from "@tanstack/react-query";
import {createFileRoute, Outlet} from '@tanstack/react-router'
import classnames from "classnames/bind";

import HeaderWithLabelAndButtons from "@/components/Header/HeaderWithLabelAndButtons.tsx";
import Location from "@/components/Header/Location.tsx";
import barter from "@/services/barter.ts";
import useRootStore from "@/store";
import querykeys from "@/util/querykeys.ts";

import styles from './result.module.scss'

const cx = classnames.bind(styles)

export const Route = createFileRoute('/_layout/_protected/search/_layout/_result')({
  component: ResultLayout
})


function ResultLayout() {
  const userId = useRootStore((state) => state.userId);
  const {data} = useSuspenseQuery({
    queryKey: [querykeys.LOCATION, userId],
    queryFn: () => barter.getUserLocation(userId),
  });


  const location = data.data.data

  return <>
    <HeaderWithLabelAndButtons label={<Location
      location={location.name.split(' ').slice(2, 3).toString()}
    />}/>
    <div className={cx('resultPage')}>
      <Outlet/>
    </div>
  </>
}