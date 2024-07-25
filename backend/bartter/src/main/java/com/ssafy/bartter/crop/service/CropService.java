package com.ssafy.bartter.crop.service;

import com.ssafy.bartter.crop.dto.CropDTO;
import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropCategory;
import com.ssafy.bartter.crop.repository.CropCategoryRepository;
import com.ssafy.bartter.crop.repository.CropRepository;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CropService {

    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final CropCategoryRepository cropCategoryRepository;

    public Crop createCrop(CropDTO.CreateRequest request) {
        User user = userRepository.findById(request.getUserId()).orElse(null);
        CropCategory cropCategory = cropCategoryRepository.findById(request.getCropCategoryId()).orElse(null);

        Crop crop = Crop.builder()
                .user(user)
                .category(cropCategory)
                .nickname(request.getNickname())
                .image("ImageURL")
                .description(request.getDescription())
                .growDate(request.getGrowDate())
                .build();

        cropRepository.save(crop);
        return crop;
    }
}
