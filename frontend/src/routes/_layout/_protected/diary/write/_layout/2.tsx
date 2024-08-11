import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import { format } from 'date-fns';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import ImageInput from '@/components/Inputs/ImageInput';
import LabeledInput from '@/components/Inputs/LabeledInput';
import LabeledTextArea from '@/components/Inputs/LabeledTextAreaInput';
import SemiCalendarInput from '@/components/Inputs/SemiCalendarInput';
import barter from '@/services/barter';
import useRootStore from '@/store';
import querykeys from '@/util/querykeys';

import styles from '../write.module.scss';
import type { SearchParamDate } from './1';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/diary/write/_layout/2')({
  component: DiaryWritePage2,
  validateSearch: (search: Record<string, unknown>): SearchParamDate => {
    return {
      selectedDate: search.selectedDate !== 'undefined' ? (search.selectedDate as string) : undefined,
      cropId: search.cropId as number,
    };
  },
});

export default function DiaryWritePage2() {
  const userId = useRootStore((state) => state.userId);
  const queryClient = useQueryClient();
  const { selectedDate, cropId } = Route.useSearch<{ selectedDate: string; cropId: number }>();

  const { data } = useQuery({
    queryKey: [querykeys.CROP_PROFILE, userId],
    queryFn: () => barter.getCropProfileListByUser(userId),
  });

  const crops = data?.data.data || [];
  const diaryCrop = crops.find((crop) => crop.cropId === cropId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File[]>([]);
  const [beforeDate, setBeforeDate] = useState<Date | null>(selectedDate ? new Date(selectedDate) : null);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (newImages: File[]) => {
    setImage(newImages);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setBeforeDate(date);
  };

  useEffect(() => {
    const isTitleValid = title.length >= 1 && title.length <= 50;
    const isContentValid = content.length >= 1 && content.length <= 2000;
    const isImageValid = image.length > 0;
    setIsFormValid(isTitleValid && isContentValid && isImageValid);
  }, [title, content, image]);

  const mutation = useMutation({
    mutationFn: barter.postCropDiary,
    onSuccess: (diaryData) => {
      console.log('mutation success:', diaryData);
      if (diaryData.data.isSuccess) {
        queryClient.invalidateQueries({ queryKey: [querykeys.CROP_PROFILE] });
        navigate({ to: '/diary' });
      } else {
        console.error('농사 일지 등록하는데 문제가 발생했습니다.');
      }
    },
    onError: (error) => {
      console.error('mutation error:', error);
    },
  });

  const handleWrite = () => {
    if (!diaryCrop) {
      console.error('No crop found, cannot send diary data.');
      return;
    }
    if (cropId && title && content && image && beforeDate) {
      const performDate = format(beforeDate, 'yyyy-MM-dd');

      const diaryData: CropDiaryForm = {
        cropId: diaryCrop.cropId,
        title,
        content,
        image,
        performDate,
      };

      mutation.mutate(diaryData);
    }
  };

  const maxImages = 1; // 허용된 최대 이미지 개수

  return (
    <div className={cx('container')}>
      <div className={cx('mainContainer')}>
        <div className={cx('cropProfile')}>
          <img
            src={diaryCrop?.image ? diaryCrop.image : ''}
            alt="등록한 작물"
            className={cx('profileImage')}
          />
          <span className={cx('nickname')}>{diaryCrop?.nickname || ''}</span>
        </div>
        <div className={cx('headingContainer')}>
          <SemiCalendarInput
            label="날짜"
            onDateChange={handleDateChange}
            selectedDate={beforeDate}
          />
          <LabeledInput
            label="제목"
            placeholder=""
            onChange={handleTitleChange}
            value={title}
          />
          <LabeledTextArea
            label="내용"
            placeholder=""
            onChange={handleContentChange}
            value={content}
          />
          <div className={cx('photoContainer')}>
            <p className={cx('photoText')}>
              사진 ({image.length}/ {maxImages})
            </p>
            <ImageInput onImageChange={handleImageChange} maxImages={maxImages} />
          </div>
        </div>
        <div className={cx('buttonContainer')}>
          <GeneralButton
            buttonStyle={{ style: 'primary', size: 'large' }}
            onClick={handleWrite}
            disabled={!isFormValid}
          >
            작성 완료
          </GeneralButton>
        </div>
      </div>
    </div>
  );
}
