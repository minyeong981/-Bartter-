import { useMutation } from '@tanstack/react-query';
import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import { useState} from 'react';

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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState<File[]>([]);


  let cannotCreate = true;
  if (title.length > 0 && title.length < 51 && content.length > 0) {
    cannotCreate = false
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleImageChange(newImages: File[]) {
      setImageList(newImages);
  }


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
    
      <div className={cx('main-continer')}>
        <div className={cx('form-container')}>
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
          <div className={cx('image-container')}>
          <div className={cx('image-text')}>
            사진 ({imageList.length} / {maxImages})
          </div>
            <ImageInput onImageChange={handleImageChange} maxImages={maxImages} />
          </div>        
      </div>

      <div className={cx('button-container')}>
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