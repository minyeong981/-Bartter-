import {useSuspenseQuery} from "@tanstack/react-query";
import {createFileRoute, useRouter} from '@tanstack/react-router'
import classnames from "classnames/bind";
import {useState} from "react";

import CropButton from "@/components/Buttons/CropButton";
import LinkButton from "@/components/Buttons/LinkButton.tsx";
import Heading from "@/components/Heading";
import barter from "@/services/barter.ts";
import useRootStore from "@/store";

import styles from './mycrops.module.scss'

export interface SearchParamFromMyCropsPage{
  myCrop?:SimpleCropProfile
}

const cx = classnames.bind(styles)

export const Route = createFileRoute('/_layout/_protected/trade/mycrops/_layout/')({
  component: MyCropsPage
})

function MyCropsPage() {
  const router = useRouter();
  const userId = useRootStore(state=>state.userId);
  const {data,isError} = useSuspenseQuery({
    queryKey: ['cropProfile'],
    queryFn: ()=> barter.getCropProfileListByUser(userId),

  });
  const [cropToGive, setCropToGive] = useState<SimpleCropProfile>();

  function handleSelectCrop(cropProfile: SimpleCropProfile) {
    setCropToGive(prev => (prev === cropProfile ? undefined : cropProfile));
  }

  if(isError){
    alert('회원님의 농작물을 불러오는데 실패했습니다.')
    router.history.back();
  }

  return (
    <div className={cx('myCropsPage')}>
      <Heading>
        내가 키운 농작물을
        <br />
        선택하세요
      </Heading>
      <div className={cx('cropListContainer')}>
        <div className={cx('cropList')}>
          {data.data.data.length &&
            data.data.data.map((crop, index) => (
              <CropButton
                key={`${index}-${crop.cropId}`}
                onClick={handleSelectCrop}
                value={crop}
                name={crop.nickname}
                imgUrl={crop.image}
                selected={cropToGive === crop}
              />
            ))}
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <LinkButton
          buttonStyle={{style: 'primary', size: 'large'}}
          to="/trade/to"
          search={{myCrop: cropToGive}}
          disabled={!cropToGive}
        >
          다음
        </LinkButton>
      </div>
    </div>
  );
}