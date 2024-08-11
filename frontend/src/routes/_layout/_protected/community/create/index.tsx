import { useMutation } from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useEffect, useState} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import ImageInput from '@/components/Inputs/ImageInput';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput';
import barter from '@/services/barter';

import styles from './create.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/_protected/community/create/')({
  component: PostCreate,
});

export default function PostCreate() {
  const maxImages = 3; // 허용된 최대 이미지 개수

  const nav = useNavigate({from: '/community/create'});
  const [cannotCreate, setCannotCreate] = useState(true); // 글자 제한
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState<File[]>([]);
  const [ errorMessage, setErrorMessage ] = useState<string>('');
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleImageChange(newImages: File[]) {

    let possibleImages: File[] = [];
    let error = '';

    setErrorMessage('')
    for ( let image of newImages) {
      if (image.size > 1_000_000 ) {
        error = `파일 '${image.name}'의 용량이 1MB를 초과합니다. `
        break;
      }

      const extension = image.name.split('.').pop()?.toLowerCase();
        if (extension && !allowedExtensions.includes(extension)) {
          error = `지원하지 않는 파일 확장자입니다. (${image.name})`;
          break;
        }
      possibleImages.push(image)
    }

    if (error) {
      setErrorMessage(error);
      setCannotCreate(true);
    } else {
      setCannotCreate(false)
      setImageList(possibleImages);
    }
  }

  useEffect(() => {
    if (title.length > 0 && title.length < 51 && content.length > 0) {
      setCannotCreate(false);
    }
  }, [title, content]);

  const mutation = useMutation({
    mutationFn: ( newPost : CommunityPostForm ) => {
      return barter.postCommunityPost(newPost)
    },
    onSuccess: () => {
      nav({ to: '/community' });
    },
  })

  function handleSubmit() {
    if (title && content) {
      const newPost : CommunityPostForm= {
        title : title,
        content: content,
        imageList: imageList
      };
      console.log(newPost)
      mutation.mutate(newPost)
    }
  }

  return (
    <div className={cx('container')}>
      <HeaderWithLabelAndBackButton label="글 작성하기" />
      <div className={cx('mainContiner')}>
        <div className={cx('formContainer')}>
          <LabeledInput
            label="제목"
            placeholder="제목"
            onChange={handleTitleChange}
            value={title}
          />
          <LabeledTextAreaInput
            label="내용"
            placeholder="내용"
            onChange={handleContentChange}
            value={content}
          />
          <div className={cx('imageContainer')}>
            <p>
              사진 ({imageList.length} / {maxImages})
            </p>
            <ImageInput onImageChange={handleImageChange} maxImages={maxImages} />
          </div>        
      </div>

      <div className={cx('buttonContainer')}>
        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          onClick={handleSubmit}
          disabled={cannotCreate}
        >
          작성완료
        </GeneralButton>        
      </div>
      </div>
    </div>
  );
}