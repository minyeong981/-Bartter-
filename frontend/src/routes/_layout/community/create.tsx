import {createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent} from 'react';
import { useState } from 'react';

import GeneralButton from '@/components/Buttons/LinkButton.tsx';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput';
import useCommunityStore from '@/store/communityStore';

import styles from './create.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/community/create')({
  component: PostCreate,
});

export default function PostCreate() {

  const nav = useNavigate();

  const posts = useCommunityStore(state => state.posts);
    const [title, setTitle] = useState('');
    const [content, setContent ] = useState('');
    const [images, setImages ] = useState<SimpleImage[]>([]);
    const addPost = useCommunityStore(state => state.addPost);


  function handleTitleChange(event : ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

    function handleContentChange(event : ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

    function handleImageChange(event : ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) {
            const newImage = Array.from(files).map((file, index) => ({
                imageId: index,
                imageUrl: URL.createObjectURL(file),
                imageOrder: index,
            }));
            setImages(newImage)
        }
  }

  function handleSubmit() {
    if (title && content) {
        addPost({
            userId: 0,
            title,
            content,
            images,
        });
    }
    console.log(posts)
    nav('/community')
  }

  return (
    <div className={cx('container')}>
      <HeaderWithLabelAndBackButton label="글 작성하기" />

      <div className={cx('formContainer')} >
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
        <input
          type="file"
          multiple
          onChange={handleImageChange}
        />

        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          onClick={handleSubmit}
        >
            작성완료
        </GeneralButton>
        </div>

    </div>
  );
}