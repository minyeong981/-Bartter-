// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "@tanstack/react-router";
// import classnames from "classnames/bind";
// import { useEffect, useState } from 'react';

// import barter from "@/services/barter";

// import Spinner from "../Spinner";
// import styles from './UserCrops.module.scss';

// const cx = classnames.bind(styles);

// interface UserCropsProps {
//   userId: number;
//   onCropClick: (id: number) => void;
// }

// function UserCrops({ userId, onCropClick }: UserCropsProps) {
//   const { data } = useQuery({
//     queryKey: ['cropProfile', userId],
//     queryFn: () => barter.getCropProfileListByUser(userId)
//   });

//   const crops = data?.data.data || [];
//   const navigate = useNavigate();
//   const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
//   const [imageUrls, setImageUrls] = useState<Record<number, string>>({});

//   useEffect(() => {
//     const loadImageUrls = async () => {
//       const newImageUrls: Record<number, string> = {};

//       await Promise.all(
//         crops.map(crop => {
//           return new Promise<void>((resolve) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//               newImageUrls[crop.cropId] = reader.result as string;
//               resolve();
//             };
//             reader.readAsDataURL(crop.image);
//           });
//         })
//       );

//       setImageUrls(newImageUrls);
//     };

//     loadImageUrls();
//   }, [crops]);

//   const handleCropClick = (cropId: number) => {
//     setSelectedCropId(cropId);
//     onCropClick(cropId);
//     navigate({ to: `/diary/growDiary/${cropId}` });
//   };

//   return (
//     <div className={cx('crops-container')}>
//       <h3 className={cx('crops-count')}>전체 작물 수 : {crops.length}</h3>
//       <div className={cx('crop-list')}>
//         {crops.map(crop => (
//           <div 
//             key={crop.cropId} 
//             className={cx('crop-card', { selected: selectedCropId === crop.cropId })} 
//             onClick={() => handleCropClick(crop.cropId)}
//           >
//             <div className={cx('crop-image-container', { selected: selectedCropId === crop.cropId })}>
//               {imageUrls[crop.cropId] ? (
//                 <img
//                   src={imageUrls[crop.cropId]}
//                   alt={crop.nickname}
//                   className={cx('crop-image', {
//                     'default-image': selectedCropId !== crop.cropId,
//                     'uploaded-image': selectedCropId === crop.cropId,
//                   })}
//                 />
//               ) : (
//                 <span>로딩 중 입니다. 잠시만 기다려주세요
//                   <br />
//                   <Spinner />
//                 </span>
                
//               )}
//             </div>
//             <div className={cx('crop-info')}>
//               <h4>{crop.nickname}</h4>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default UserCrops;


import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import classnames from "classnames/bind";
import { useEffect, useState } from 'react';

import notCrop from '@/assets/image/notCrop.png';
import barter from "@/services/barter";

import Spinner from "../Spinner";
import styles from './UserCrops.module.scss';

const cx = classnames.bind(styles);

interface UserCropsProps {
  userId: number;
  onCropClick: (id: number) => void;
}

function UserCrops({ userId, onCropClick }: UserCropsProps) {
  const { data } = useQuery({
    queryKey: ['cropProfile', userId],
    queryFn: () => barter.getCropProfileListByUser(userId)
  });

  const crops = data?.data.data || [];
  const navigate = useNavigate();
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    const loadImageUrls = async () => {
      const newImageUrls: Record<number, string> = {};

      await Promise.all(
        crops.map(crop => {
          return new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              newImageUrls[crop.cropId] = reader.result as string;
              resolve();
            };
            reader.readAsDataURL(crop.image);
          });
        })
      );

      setImageUrls(newImageUrls);
    };

    loadImageUrls();
  }, [crops]);

  const handleCropClick = (cropId: number) => {
    setSelectedCropId(cropId);
    onCropClick(cropId);
    navigate({ to: `/diary/growDiary/${cropId}` });
  };

  return (
    <div className={cx('crops-container')}>
      {crops.length === 0 ? (
        <>
          <h3>아직 등록된 농작물이 없습니다.</h3>
          <img src={notCrop} alt="notCrop" />
        </>
      ) : (
        <>
          <h3 className={cx('crops-count')}>전체 작물 수 : {crops.length}</h3>
          <div className={cx('crop-list')}>
            {crops.map(crop => (
              <div 
                key={crop.cropId} 
                className={cx('crop-card', { selected: selectedCropId === crop.cropId })} 
                onClick={() => handleCropClick(crop.cropId)}
              >
                <div className={cx('crop-image-container', { selected: selectedCropId === crop.cropId })}>
                  {imageUrls[crop.cropId] ? (
                    <img
                      src={imageUrls[crop.cropId]}
                      alt={crop.nickname}
                      className={cx('crop-image', {
                        'default-image': selectedCropId !== crop.cropId,
                        'uploaded-image': selectedCropId === crop.cropId,
                      })}
                    />
                  ) : (
                    <span>
                      로딩 중 입니다. 잠시만 기다려주세요
                      <br />
                      <Spinner />
                    </span>
                  )}
                </div>
                <div className={cx('crop-info')}>
                  <h4>{crop.nickname}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserCrops;
