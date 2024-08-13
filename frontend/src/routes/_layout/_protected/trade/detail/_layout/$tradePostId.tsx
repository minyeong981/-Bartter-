import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import {useContext} from "react";

import CropButton from "@/components/Buttons/CropButton";
import LinkButton from "@/components/Buttons/LinkButton.tsx";
import Carousel from '@/components/Carousel';
import CheckboxInput from "@/components/Inputs/CheckboxInput.tsx";
import UserNameLocation from '@/components/User/UserNameLocation.tsx';
import {TradeContext} from "@/routes/_layout/_protected/trade/detail/_layout.tsx";
import barter from "@/services/barter.ts";

import styles from './detail.module.scss';


const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/trade/detail/_layout/$tradePostId')({
  component: TradeDetailPage,
});

function TradeDetailPage() {
  const queryClient = useQueryClient();
  const {
    author,
    tradePostId,
    createdAt,
    title,
    location,
    imageList,
    content,
    desiredCategoryList,
    hasCrop,
    isShare,
    cropId
  } = useContext(TradeContext)
  const navigate = Route.useNavigate();
  const {mutate: deletePost} = useMutation({
    mutationFn: barter.deleteTradePost, onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tradeList']})
      await navigate({to: '/trade'})
    }
  })

  function handleDelete(postId: number) {
    deletePost(postId)
  }


  return (
    <div className={cx('detailPage')}>
      <Carousel images={imageList}/>
      <UserNameLocation
        userId={author.userId}
        postId={tradePostId}
        locationName={location.name}
        nickname={author.nickname}
        createdAt={createdAt}
        profileImage={author.profileImage}
        onDelete={handleDelete}
      />
      <div className={cx('detail')}>
        <h1 className={cx('title', 'padding')}>{title}</h1>
        <p className={cx('content', 'padding')}>{content}</p>
        <CheckboxInput
          label="나눔인가요?"
          checked={isShare}
          onChange={() => null}
          disabled
        />
        {hasCrop && <LinkButton buttonStyle={{style: 'primary', size: 'large'}} to="/diary/growDiary/$cropId"
                                params={{cropId: String(cropId)}}>
          작물의 성장일기 보러가기 🗓
        </LinkButton>}
        {!!desiredCategoryList.length && <div className={cx('cropList', 'padding')}>
          <p>받고싶은 작물 목록</p>
          <div className={cx('crops')}>
            {desiredCategoryList.length &&
              desiredCategoryList.map((crop) => (
                <CropButton
                  key={crop.cropCategoryId}
                  onClick={() => null}
                  value={crop.cropCategoryId}
                  name={crop.name}
                  imgUrl={crop.image}
                />
              ))}
          </div>
        </div>}
      </div>
    </div>
  );
}