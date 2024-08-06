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

interface Crop {
  id: number;
  name: string;
  image: string;
}


const crops: Crop[] = [
  { id: 1, name: '사과', image: appleImage },
  { id: 2, name: '콩', image: beanImage },
  { id: 3, name: '당근', image: carrotImage },
  { id: 4, name: '옥수수', image: cornImage },
  { id: 5, name: '오이', image: cucumberImage },
  { id: 6, name: '가지', image: eggPlantImage },
  { id: 7, name: '토마토', image: tomatoImage },
  { id: 8, name: '마늘', image: garlicImage },
  { id: 9, name: '포도', image: grapeImage },
  { id: 10, name: '파', image: greenOnionImage },
  { id: 11, name: '상추', image: lettuceImage },
  { id: 12, name: '귤', image: mandarinImage },
  { id: 13, name: '버섯', image: mushroomImage },
  { id: 14, name: '배추', image: nanaCabbageImage },
  { id: 15, name: '고구마', image: sweetPotatoImage },
  { id: 16, name: '양파', image: onionImage },
  { id: 17, name: '복숭아', image: peachImage },
  { id: 18, name: '배', image: pearImage },
  { id: 19, name: '고추', image: pepperImage },
  { id: 20, name: '감', image: persimmonImage },
  { id: 21, name: '감자', image: potatoImage },
  { id: 22, name: '호박', image: pumpkinImage },
  { id: 23, name: '참깨', image: sesameImage },
  { id: 24, name: '시금치', image: spinachImage },
  { id: 25, name: '딸기', image: strawberryImage },
  { id: 26, name: '기타', image: etcImage },
];

export default crops;
