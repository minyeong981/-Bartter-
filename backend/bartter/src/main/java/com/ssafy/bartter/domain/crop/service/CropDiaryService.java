package com.ssafy.bartter.domain.crop.service;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.crop.repository.CropDiaryRepository;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import static com.ssafy.bartter.domain.crop.dto.CropDiaryDto.Create;

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
     */
    public CropDiary createCropDiary(Create request, MultipartFile image, int
            userId) {
        Crop crop = cropRepository.findById(request.getCropId()).orElseThrow(() -> new CustomException(ErrorCode.CROP_NOT_FOUND));

        if (!crop.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }

        if (image == null) {
            throw new CustomException(ErrorCode.IMAGE_NOT_ADDED);
        }

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

    /**
     * 농사일지 상세조회
     */
    @Transactional(readOnly = true)
    public CropDiary getCropDiary(int cropDiaryId) {
        return cropDiaryRepository.findById(cropDiaryId).orElseThrow(() -> new CustomException(ErrorCode.CROP_DIARY_NOT_FOUND));
    }

    /**
     * 농사일지 삭제
     */
    public void deleteCropDiary(int cropDiaryId, int userId) {
        CropDiary diary = cropDiaryRepository.findById(cropDiaryId).orElseThrow(() -> new CustomException(ErrorCode.CROP_DIARY_NOT_FOUND));

        if (!diary.getCrop().getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }

        s3UploadService.delete(diary.getImage());
        cropDiaryRepository.delete(diary);
    }

    /**
     * 특정 유저가 작성한 농사일지 전체조회
     */
    @Transactional(readOnly = true)
    public List<CropDiary> getUserDiaryList(int userId, int page, int limit, int year, int month) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        return cropDiaryRepository.findAllByDateAndCrop(year, month, userId, pageable);
    }

    /**
     * 특정 농작물의 농사일지 전체 조회
     */
    @Transactional(readOnly = true)
    public List<CropDiary> getCropDiaryList(int cropId) {
        Crop crop = cropRepository.findById(cropId).orElseThrow(() -> new CustomException(ErrorCode.CROP_NOT_FOUND));
        return cropDiaryRepository.findAllByCropId(cropId);
    }

    /**
     * 특정 농작물의 이번주차 농사일지 조회
     */
    @Transactional(readOnly = true)
    public List<CropDiary> getWeeklyCropDiaryList(int cropId, LocalDate todayDate) {
        LocalDate mondayDate = todayDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        return cropDiaryRepository.findAllByCropIdAndDateRange(cropId, mondayDate, todayDate);
    }
}


