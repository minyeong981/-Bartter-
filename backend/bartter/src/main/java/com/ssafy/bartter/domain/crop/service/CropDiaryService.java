package com.ssafy.bartter.domain.crop.service;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.crop.repository.CropDiaryRepository;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.domain.user.entity.Follow;
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
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.stream.Collectors;

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
    public CropDiary createCropDiary(
            Create request,
            MultipartFile image,
            int userId
    ) {
        Crop crop = cropRepository.findById(request.getCropId()).orElseThrow(() -> new CustomException(ErrorCode.CROP_NOT_FOUND));

        if (!crop.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }

        String imageUrl = s3UploadService.upload(image);

        LocalDate performDate = (request.getPerformDate() == null) ? LocalDate.now() : request.getPerformDate();

        CropDiary diary = CropDiary.builder()
                .crop(crop)
                .title(request.getTitle())
                .content(request.getContent())
                .image(imageUrl)
                .performDate(performDate)
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
        PageRequest pageable = PageRequest.of(page, limit, Sort.by("performDate").descending());
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

    /**
     * 현재 로그인한 유저가 팔로우 하는 유저들의 농사일지 N개 (numOfDiaries) 조회
     */
    @Transactional(readOnly = true)
    public List<CropDiary> getFolloweeDiaryList(int userId, int numOfDiaries) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        List<User> followeeList = user.getFolloweeList().stream().map(Follow::getFollowee).collect(Collectors.toList());
        PageRequest pageable = PageRequest.of(0, numOfDiaries, Sort.by("createdAt").descending());
        return cropDiaryRepository.findAllByUserList(followeeList, pageable);
    }

    /**
     * 특정 달에 유저가 농사일지를 작성한 일자들을 조회한다.
     */
    @Transactional(readOnly = true)
    public List<LocalDate> getUserDiaryWrittenDateList(int userId, int year, int month) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if (!(month >= 1 && month <= 12)) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE);
        }
        return cropDiaryRepository.findDiaryWrittenDateList(userId, year, month);
    }

    /**
     * 특정 날짜에 유저가 작성한 농사일지 리스트를 조회한다.
     */
    public List<CropDiary> getUserDiaryListByDate(int userId, LocalDate date) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return cropDiaryRepository.findByUserIdAndPerformDate(userId, date);
    }
}


