package com.ssafy.bartter.crop.service;

import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropDiary;
import com.ssafy.bartter.crop.repository.CropDiaryRepository;
import com.ssafy.bartter.crop.repository.CropRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.bartter.crop.dto.CropDiaryDto.*;

/**
 * CropDiary Entity 연관 Service
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

    public CropDiary createCropDiary(Create request, MultipartFile image) {
        Crop crop = cropRepository.findById(request.getCropId()).orElseThrow(() -> new CustomException(ErrorCode.CROP_NOT_FOUND));
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
    public CropDiary getCropDiary(Integer cropDiaryId) {
        return cropDiaryRepository.findById(cropDiaryId).orElseThrow(() -> new CustomException(ErrorCode.CROP_DIARY_NOT_FOUND));
    }

    public void deleteCropDiary(Integer cropDiaryId) {
        CropDiary diary = cropDiaryRepository.findById(cropDiaryId).orElseThrow(() -> new CustomException(ErrorCode.CROP_DIARY_NOT_FOUND));
        cropDiaryRepository.delete(diary);
    }
}
