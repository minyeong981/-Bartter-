import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import appleImage from '@/assets/image/apple.png';
import beanImage from '@/assets/image/bean.png';
import carrotImage from '@/assets/image/carrot.png';
import cornImage from '@/assets/image/corn.png';
import cucumberImage from '@/assets/image/cucumber.png';
import eggPlantImage from '@/assets/image/eggPlant.png';
import etcImage from '@/assets/image/etc.png';
import garlicImage from '@/assets/image/garlic.png';
import grapeImage from '@/assets/image/grape.png';
import greenOnionImage from '@/assets/image/greenOnion.png';
import lettuceImage from '@/assets/image/lettuce.png';
import mandarinImage from '@/assets/image/mandarin.png';
import mushroomImage from '@/assets/image/mushroom.png';
import nanaCabbageImage from '@/assets/image/nanaCabbage.png';
import notCrop from '@/assets/image/notCrop.png';
import onionImage from '@/assets/image/onion.png';
import peachImage from '@/assets/image/peach.png';
import pearImage from '@/assets/image/pear.png';
import pepperImage from '@/assets/image/pepper.png';
import persimmonImage from '@/assets/image/persimmon.png';
import potatoImage from '@/assets/image/potato.png';
import pumpkinImage from '@/assets/image/pumpkin.png';
import sesameImage from '@/assets/image/sesame.png';
import spinachImage from '@/assets/image/spinach.png';
import strawberryImage from '@/assets/image/strawberry.png';
import sweetPotatoImage from '@/assets/image/sweetPotato.png';
import tomatoImage from '@/assets/image/tomato.png';
import GeneralButton from '@/components/Buttons/GeneralButton';
import CropModal from '@/components/Crop/CropModal';

import styles from './myCrops.module.scss';

interface CropProps {
  cropImageSrc: string;
  cropNameSrc: string;
}

const initialCrops: CropProps[] = [
  {
    cropImageSrc: appleImage,
    cropNameSrc: '사과',
  },
  {
    cropImageSrc: beanImage,
    cropNameSrc: '콩',
  },
  {
    cropImageSrc: carrotImage,
    cropNameSrc: '당근',
  },
  {
    cropImageSrc: cornImage,
    cropNameSrc: '옥수수',
  },
  {
    cropImageSrc: cucumberImage,
    cropNameSrc: '오이',
  },
  {
    cropImageSrc: eggPlantImage,
    cropNameSrc: '가지',
  },
  {
    cropImageSrc: grapeImage,
    cropNameSrc: '포도',
  },
  {
    cropImageSrc: garlicImage,
    cropNameSrc: '마늘',
  },
  {
    cropImageSrc: greenOnionImage,
    cropNameSrc: '파',
  },
  {
    cropImageSrc: lettuceImage,
    cropNameSrc: '상추',
  },
  {
    cropImageSrc: mandarinImage,
    cropNameSrc: '귤',
  },
  {
    cropImageSrc: mushroomImage,
    cropNameSrc: '버섯',
  },
  {
    cropImageSrc: nanaCabbageImage,
    cropNameSrc: '배추',
  },
  {
    cropImageSrc: onionImage,
    cropNameSrc: '양파',
  },
  {
    cropImageSrc: peachImage,
    cropNameSrc: '복숭아',
  },
  {
    cropImageSrc: pearImage,
    cropNameSrc: '배',
  },
  {
    cropImageSrc: pepperImage,
    cropNameSrc: '고추',
  },
  {
    cropImageSrc: persimmonImage,
    cropNameSrc: '감',
  },
  {
    cropImageSrc: potatoImage,
    cropNameSrc: '감자',
  },
  {
    cropImageSrc: pumpkinImage,
    cropNameSrc: '호박',
  },
  {
    cropImageSrc: sesameImage,
    cropNameSrc: '깨',
  },
  {
    cropImageSrc: spinachImage,
    cropNameSrc: '시금치',
  },
  {
    cropImageSrc: strawberryImage,
    cropNameSrc: '딸기',
  },
  {
    cropImageSrc: sweetPotatoImage,
    cropNameSrc: '고구마',
  },
  {
    cropImageSrc: tomatoImage,
    cropNameSrc: '토마토',
  },
  {
    cropImageSrc: etcImage,
    cropNameSrc: '기타',
  },
];

export default function MyCrops() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCropSelect(index: number) {
    setSelectedCrop(index);
  }

  return (
    <div className={styles.container}>
      {selectedCrop === null ? (
        <div className={styles['no-crops']}>
          <h3>아직 등록된 농작물이 없습니다.</h3>
          <img src={notCrop} alt="notCrop" />
        </div>
      ) : (
        <div>
          <h3>전체 작물 ( 숫자 카운트 )</h3>
          <div className={styles['crop-list']}>
            <div className={styles['crop-item']}>
              <img src={initialCrops[selectedCrop].cropImageSrc} alt={initialCrops[selectedCrop].cropNameSrc} className={styles['crop-image-thumbnail']} />
              <div>{initialCrops[selectedCrop].cropNameSrc}</div>
            </div>
          </div>
        </div>
      )}
      <CropModal
        show={showModal}
        onClose={handleCloseModal}
        crops={initialCrops}
        onCropSelect={handleCropSelect}
        selectedCrop={selectedCrop}
        showSearchBar={true}
      />
      <div className={styles['floating-button']}>
        <GeneralButton
          buttonStyle={{ style: 'floating', size:'small'}}
          onClick={handleOpenModal}
        >
          + 등록하기
        </GeneralButton>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_layout/diary/myCrops')({
  component: MyCrops
});
