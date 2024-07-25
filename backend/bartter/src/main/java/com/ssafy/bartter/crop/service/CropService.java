package com.ssafy.bartter.crop.service;

import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropCategory;
import com.ssafy.bartter.crop.repository.CropCategoryRepository;
import com.ssafy.bartter.crop.repository.CropRepository;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.bartter.crop.dto.CropDto.Create;

/**
 * Crop Entity 연관 Service
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

    public Crop createCrop(Create request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        CropCategory cropCategory = cropCategoryRepository.findById(request.getCropCategoryId()).orElse(null);
        String imageUrl = s3UploadService.upload(request.getImage());

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
}
