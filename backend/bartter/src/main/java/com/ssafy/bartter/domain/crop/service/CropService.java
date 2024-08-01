package com.ssafy.bartter.domain.crop.service;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropCategory;
import com.ssafy.bartter.domain.crop.repository.CropCategoryRepository;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.ssafy.bartter.domain.crop.dto.CropDto.Create;

/**
 * 농작물 프로필 Service
 *
 * @author 김가람
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CropService {

    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final CropCategoryRepository cropCategoryRepository;
    private final S3UploadService s3UploadService;

    /**
     * 농작물 프로필 생성
     */
    public Crop createCrop(Create request, MultipartFile image, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        CropCategory cropCategory = cropCategoryRepository.findById(request.getCropCategoryId()).orElseThrow(() -> new CustomException(ErrorCode.CROP_CATEGORY_NOT_FOUND));
        String imageUrl = null;
        if (image != null) {
            imageUrl = s3UploadService.upload(image);
        }

        Crop crop = Crop.builder()
                .user(user)
                .category(cropCategory)
                .nickname(request.getNickname())
                .image(imageUrl)
                .description(request.getDescription())
                .growDate(request.getGrowDate())
                .build();

        cropRepository.save(crop);
        return crop;
    }

    /**
     * 농작물 카테고리 전체 조회
     */
    @Transactional(readOnly = true)
    public List<CropCategory> getCropCategoryList(String name) {
        return cropCategoryRepository.findAllByNameContaining(name);
    }

    // TODO : Fetch join - CropCategory

    /**
     * 농작물 프로필 상세 조회
     */
    @Transactional(readOnly = true)
    public Crop getCrop(int cropId) {
        return cropRepository.findById(cropId).orElseThrow(() -> new CustomException(ErrorCode.CROP_NOT_FOUND));
    }

    /**
     * 유저의 농작물 프로필 전체 조회
     */
    @Transactional(readOnly = true)
    public List<Crop> getUserCropList(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return cropRepository.findAllByUserId(userId);
    }

    // TODO : TEST

    /**
     * 유저가 교환 & 나눔(give)한 농작물
     */
    @Transactional(readOnly = true)
    public List<Crop> getUserGiveCropList(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return cropRepository.findGiveCropByUserId(userId);
    }

    // TODO : TEST

    /**
     * 유저가 교환 & 나눔(receive)한 농작물
     */
    @Transactional(readOnly = true)
    public List<Crop> getUserReceiveCropList(int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return cropRepository.findReceiveCropByUserId(userId);
    }
}
