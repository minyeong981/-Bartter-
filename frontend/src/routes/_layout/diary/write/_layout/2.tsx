import 'react-datepicker/dist/react-datepicker.css';

import {createFileRoute} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';

import LinkButton from '@/components/Buttons/LinkButton';
import ImageInput from '@/components/Inputs/ImageInput';
import LabeledInput from '@/components/Inputs/LabeledInput';
import LabeledTextArea from '@/components/Inputs/LabeledTextAreaInput';
import SemiCalendarInput from '@/components/Inputs/SemiCalendarInput';

import styles from '../write.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/diary/write/_layout/2')({
  component: DiaryWritePage2,
});

function DiaryWritePage2() {
  // @ts-ignore
  const { selectedCrop } = Route.useSearch();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [diaryContent, setDiaryContent] = useState('');
  const [diaryTitle, setDiaryTitle] = useState('');
  const maxImages = 1; // 허용된 최대 이미지 개수
  const [diaryImage, setDiaryImage] = useState<string[]>([]); // 초기 이미지를 빈 배열로 설정
  const [isFormValid, setIsFormValid] = useState(false);

  const handleImageChange = (newImages: string[]) => {
    setDiaryImage(newImages.slice(0, maxImages));
  };

  const handleTitleChange = (title: string) => {
    setDiaryTitle(title);
  };

  const handleContentChange = (content: string) => {
    setDiaryContent(content);
  };

  useEffect(() => {
    const isTitleValid = diaryTitle.length >= 1 && diaryTitle.length <= 50;
    const isContentValid = diaryContent.length >= 1 && diaryContent.length <= 2000;
    const isImageValid = diaryImage.length > 0;
    const isDateValid = selectedDate !== null;
    setIsFormValid(isTitleValid && isContentValid && isImageValid && isDateValid);
  }, [diaryTitle, diaryContent, diaryImage, selectedDate]);

  return (
    <div>
      <div className={cx('writePage2Container')}>
        <div className={cx('CropProfile')}>
          <img src={selectedCrop?.image || ''} alt="등록한 작물" className={cx('profileImage')} />
          <span className={cx('nickname')}>{selectedCrop?.nickname || ''}</span>
        </div>
        <SemiCalendarInput
          label="날짜"
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <LabeledInput
          label="제목"
          placeholder=""
          onChange={(e) => handleTitleChange(e.target.value)}
          value={diaryTitle}
        />
        <LabeledTextArea
          label="내용"
          placeholder=""
          value={diaryContent}
          onChange={(e) => handleContentChange(e.target.value)}
        />
        <div className={cx('photoContainer')}>
          <p className={cx('photoText')}>사진 ({diaryImage.length} / {maxImages})</p>
          <ImageInput onImageChange={handleImageChange} maxImages={maxImages} />
        </div>
        <LinkButton
          buttonStyle={{ style: 'primary', size: 'large' }}
          to="/diary"
          search={{
            selectedDate: (selectedDate || new Date()).toISOString(),
            diaryTitle: diaryTitle,
            diaryContent: diaryContent,
            diaryImage: diaryImage,
            cropImage: selectedCrop.cropImage,
            cropNickname: selectedCrop.cropNickname
          }}
          disabled={!isFormValid}
        >
          작성 완료
        </LinkButton>
      </div>
    </div>
  );
}

export default DiaryWritePage2;
