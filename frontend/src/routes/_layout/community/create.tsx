import {createFileRoute, useNavigate } from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type { ChangeEvent} from 'react';
import { useState } from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
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

  const nav = useNavigate({ from: '/community/create'});

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
        console.log(images)
  }

  // 나중에!! 이런 식으로
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   const response = await fetch('/posts', {
  //     method: 'POST',
  //     body: JSON.stringify({ title: 'My First Post' }),
  //   })

  //   const { id: postId } = await response.json()

  //   if (response.ok) {
  //     navigate({ to: '/posts/$postId', params: { postId } })
  //   }
  // }

  function handleSubmit() {
    if (title && content) {
        addPost({
            userId: 0,
            title,
            content,
            images,
        });
    }

    nav({ to: '/community'})
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

        <div className={cx('imageContainer')}>
          { images && images.map((img, imgIndex) => 
          <img 
          key={imgIndex} 
          className={cx('image')}
          src={img.imageUrl} alt="" />
          )}
        </div>

        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          onClick= {handleSubmit}
        >
            작성완료
        </GeneralButton>

        </div>

    </div>
  );
}