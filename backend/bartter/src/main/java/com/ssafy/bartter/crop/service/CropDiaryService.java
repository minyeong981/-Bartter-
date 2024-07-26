package com.ssafy.bartter.crop.service;

import com.ssafy.bartter.crop.dto.CropDiaryDto;
import com.ssafy.bartter.crop.dto.CropDto;
import com.ssafy.bartter.crop.entity.CropDiary;
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
    public CropDiary createCropDiary(Create request, MultipartFile image) {
        return null;
    }
}
