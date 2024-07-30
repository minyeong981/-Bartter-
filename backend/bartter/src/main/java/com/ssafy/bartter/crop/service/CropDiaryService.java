package com.ssafy.bartter.crop.service;

import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropDiary;
import com.ssafy.bartter.crop.repository.CropDiaryRepository;
import com.ssafy.bartter.crop.repository.CropRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.bartter.crop.dto.CropDiaryDto.Create;

/**
 * 농사일지 Service
 *
 * @author 김가람
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CropDiaryService {

    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final CropDiaryRepository cropDiaryRepository;
    private final S3UploadService s3UploadService;

    /**
     * 농사일지 작성
     * */
    public CropDiary createCropDiary(Create request, MultipartFile image, Integer userId) {
        Crop crop = cropRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.CROP_NOT_FOUND));
        String imageUrl = s3UploadService.upload(image);

        CropDiary diary = CropDiary.builder()
                .crop(crop)
                .title(request.getTitle())
                .content(request.getContent())
                .image(imageUrl)
                .build();

        cropDiaryRepository.save(diary);
        return diary;
    }

    // TODO : Fetch join - Crop
    /**
     * 농사일지 상세조회
     * */
    @Transactional(readOnly = true)
    public CropDiary getCropDiary(Integer cropDiaryId) {
        return cropDiaryRepository.findById(cropDiaryId).orElseThrow(() -> new CustomException(ErrorCode.CROP_DIARY_NOT_FOUND));
    }

    /**
     * 농사일지 삭제
     * */
    // TODO : AWS에서 삭제
    public void deleteCropDiary(Integer cropDiaryId, Integer userId) {
        CropDiary diary = cropDiaryRepository.findById(cropDiaryId).orElseThrow(() -> new CustomException(ErrorCode.CROP_DIARY_NOT_FOUND));
        if (!diary.getCrop().getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }
        cropDiaryRepository.delete(diary);
    }
}
