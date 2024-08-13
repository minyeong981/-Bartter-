import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useEffect, useState} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import LabeledSelectCropButton from '@/components/Buttons/SelectCropButton/LabeledSelectCropButton.tsx';
import CropImage from '@/components/CropImage';
import CheckboxInput from '@/components/Inputs/CheckboxInput.tsx';
import LabeledImageInput from '@/components/Inputs/LabeledImageInput.tsx';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput.tsx';
import type {SearchParamsFromToPage} from '@/routes/_layout/_protected/trade/to/_layout/index.tsx';
import barter from '@/services/barter.ts';
import useRootStore from "@/store";
import {getPosition} from '@/util/geolocation.ts';

import styles from '../write.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute(
  '/_layout/_protected/trade/write/_layout/',
)({
  component: WritePage,
  validateSearch: ({
                     myCrop,
                     cropToGive,
                     cropsToGet
                   }: Record<string, unknown>): SearchParamsFromToPage => {

    if (myCrop) {
      return {
        myCrop: myCrop as SimpleCropProfile,
        cropsToGet: cropsToGet as CropCategoryDetail[]
      }
    }
    return {
      cropToGive: cropToGive as CropCategoryDetail,
      cropsToGet: cropsToGet as CropCategoryDetail[],
    };
  },
});

function WritePage() {
  const userId = useRootStore(state => state.userId);
  const queryClient = useQueryClient();
  const navigate = useNavigate({from: '/trade/write'});
  const {cropsToGet, myCrop, cropToGive} = Route.useSearch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [position, setPosition] = useState<SimpleLocation>();


  const {mutate: getUserLocation} = useMutation({
    mutationFn: barter.getUserLocation, onSuccess: ({data}) => {
      setPosition(data.data)
    }
  })
  const {mutate: getLocation} = useMutation({
    mutationFn: barter.getCurrentLocation,
    onSuccess: ({data}) => {
      setPosition(data.data);
    },
  });
  const {mutate: submitForm} = useMutation({
    mutationFn: barter.postTradePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['tradeList']});
      await navigate({to: '/trade'});
    },
  });

  const disabled =
    !(cropToGive || myCrop) || !cropsToGet.length || !title || !content || !images.length;

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.currentTarget.value);
  }

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.currentTarget.checked);
    setIsShared(e.currentTarget.checked);
  }

  function handleImageFileChange(files: File[]) {
    setImages(files);
  }

  async function handleGetLocation() {
    const {coords} = await getPosition();
    getLocation(coords);
  }

  useEffect(() => {
    getUserLocation(userId);
  }, [getUserLocation, userId]);

  function handleSubmit() {
    console.log('전송!')
    submitForm({
      create: {
        title,
        content,
        shareStatus: isShared,
        cropCategoryId: myCrop?.cropCategoryId ||  cropToGive!.cropCategoryId,
        locationId: position!.locationId,
        wishCropCategoryList: isShared ? [] : cropsToGet.map(crop => crop.cropCategoryId),
        cropId: myCrop?.cropId,
      },
      images,
    });
  }

  return (
    <div className={cx('writePage')}>
      <div className={cx('cropProfile')}>
        <CropImage imgSrc={myCrop?.image || cropToGive!.image} label={myCrop?.nickname || cropToGive!.name}/>
      </div>
      <div className={cx('mainContainer')}>
        <div className={cx('inputContainer')}>
          <LabeledInput
            label="제목"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />
          <CheckboxInput
            label="나눔인가요?"
            checked={isShared}
            onChange={handleCheckboxChange}
          />
          <LabeledSelectCropButton
            label="주고 싶은 작물"
            selectedCrops={[myCrop?.nickname || cropToGive!.name]}
          />
          {!isShared && <LabeledSelectCropButton
              label="받고 싶은 작물"
              selectedCrops={cropsToGet.map(crop => crop.name)}
          />}
          <LabeledTextAreaInput
            label="내용"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleDescriptionChange}
          />
          <LabeledImageInput
            onImageChange={handleImageFileChange}
            maxImages={3}
            label="사진"
          />
        </div>
      </div>
      <div className={cx('buttonContainer')}>
        <div>
          <GeneralButton
            buttonStyle={{style: 'outlined', size: 'large'}}
            onClick={handleGetLocation}
            type="button"
          >
            {position?.name || '위치 등록'}
          </GeneralButton>
        </div>
        <div>
          <GeneralButton
            buttonStyle={{style: 'primary', size: 'large'}}
            disabled={disabled}
            type="button"
            onClick={handleSubmit}
          >
            작성 완료
          </GeneralButton>
        </div>
      </div>
    </div>
  );
}