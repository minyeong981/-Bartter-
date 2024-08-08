import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';

import {ImageLettuce} from '@/assets/image';
import GeneralButton from '@/components/Buttons/GeneralButton.tsx';
import LabeledSelectCropButton from '@/components/Buttons/SelectCropButton/LabeledSelectCropButton.tsx';
import CropImage from '@/components/CropImage';
import CheckboxInput from '@/components/Inputs/CheckboxInput.tsx';
import LabeledImageInput from '@/components/Inputs/LabeledImageInput.tsx';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput.tsx';
import type {SearchParamsFromToPage} from '@/routes/_layout/trade/to/_layout/index.tsx';

import styles from './write.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/trade/write/_layout/')({
  component: WritePage,
  validateSearch: ({
    cropToGive,
    cropsToGet,
  }: Record<string, unknown>): SearchParamsFromToPage => {
    return {
      cropToGive: cropToGive as CropCategoryDetail,
      cropsToGet: cropsToGet as CropCategoryDetail[],
    };
  },
});

function WritePage() {
  const {cropToGive, cropsToGet} = Route.useSearch();

  console.log(cropsToGet);

  return (
    <div className={cx('writePage')}>
      <div className={cx('inputContainer')}>
        <CropImage imgSrc={ImageLettuce} label="상추" />
        <LabeledInput label="제목" placeholder="제목을 입력하세요" />
        <CheckboxInput label="나눔인가요?" />
        <LabeledSelectCropButton
          label="주고 싶은 작물"
          selectedCrops={[cropToGive!.name]}
        />
        <LabeledSelectCropButton
          label="받고 싶은 작물"
          selectedCrops={cropsToGet.map(crop => crop.name)}
        />

        <LabeledTextAreaInput label="내용" placeholder="내용을 입력하세요" />
        <LabeledImageInput
          onImageChange={() => null}
          maxImages={3}
          label="사진"
        />
        <GeneralButton buttonStyle={{style: 'outlined', size: 'large'}}>
          위치 등록
        </GeneralButton>
      </div>
      <div className={cx('buttonContainer')}>
        <GeneralButton buttonStyle={{style: 'primary', size: 'large'}}>
          작성 완료
        </GeneralButton>
      </div>
    </div>
  );
}