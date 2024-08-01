import {createFileRoute, useNavigate} from '@tanstack/react-router';
import classnames from 'classnames/bind';
import type {ChangeEvent} from 'react';
import {useEffect, useState} from 'react';

import GeneralButton from '@/components/Buttons/GeneralButton';
import HeaderWithLabelAndBackButton from '@/components/Header/HeaderWithLabelAndBackButton';
import ImageInput from '@/components/Inputs/ImageInput';
import LabeledInput from '@/components/Inputs/LabeledInput.tsx';
import LabeledTextAreaInput from '@/components/Inputs/LabeledTextAreaInput';
import useRootStore from '@/store';

import styles from './create.module.scss';

const cx = classnames.bind(styles);

export const Route = createFileRoute('/_layout/community/create/')({
  component: PostCreate,
});

export default function PostCreate() {
  const maxImages = 3; // 허용된 최대 이미지 개수

  const nav = useNavigate({from: '/community/create'});
  const [ cannotCreate, setCannotCreate ] = useState(true); // 글자 제한
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<SimpleImage[]>([]);
  const addPost = useRootStore(state => state.addPost);

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleContentChange(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleImageChange(newImages: string[]) {

    const newImageList = newImages.map((imageUrl, imageIndex) => ({
      imageId : imageIndex,
      imageUrl : imageUrl,
      imageOrder: imageIndex
    }))

    setImages([...newImageList]);

  };

  useEffect(()=> {
    if (title.length>0 &&title.length < 51 && content.length>0) {
    setCannotCreate(false) }
  }, [title, content])

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

    nav({to: '/community'});
  }


  return (
    <div className={cx('container')}>
      <HeaderWithLabelAndBackButton label="글 작성하기" />

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
        <input type="file" multiple onChange={handleImageChange} />
        <p>사진 ({images.length} / {maxImages})</p>
        {/* <ImageInput onImageChange={handleImageChange} maxImages={maxImages}/> */}

        <div className={cx('imageContainer')}>
        <p>사진 ({images.length} / {maxImages})</p>
        <ImageInput onImageChange={handleImageChange} maxImages={maxImages}/>
        </div>

        <GeneralButton
          buttonStyle={{style: 'primary', size: 'large'}}
          onClick={handleSubmit}
          disabled={cannotCreate}
        >
          작성완료
        </GeneralButton>
      </div>
    </div>
  );
}