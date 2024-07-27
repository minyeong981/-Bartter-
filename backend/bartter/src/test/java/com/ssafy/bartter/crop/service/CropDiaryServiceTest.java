package com.ssafy.bartter.crop.service;

import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropDiary;
import com.ssafy.bartter.crop.repository.CropDiaryRepository;
import com.ssafy.bartter.crop.repository.CropRepository;
import com.ssafy.bartter.global.service.S3UploadService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static com.ssafy.bartter.crop.dto.CropDiaryDto.Create;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

@ExtendWith(MockitoExtension.class)
class CropDiaryServiceTest {

    @Mock
    private CropRepository cropRepository;

    @Mock
    private S3UploadService s3UploadService;

    @Mock
    private CropDiaryRepository cropDiaryRepository;

    @InjectMocks
    private CropDiaryService cropDiaryService;

    @DisplayName("농사일지 생성")
    @Test
    void 농사일지_생성() {
        // given

        // Request
        Integer cropId = 1;
        String title = "title";
        String content = "content";
        MultipartFile image = mock(MultipartFile.class);

        Create request = new Create(cropId, title, content);

        Crop mockCrop = mock(Crop.class);

        given(cropRepository.findById(cropId)).willReturn(Optional.of(mockCrop));
        given(s3UploadService.upload(image)).willReturn("testurl");

        // when
        CropDiary diary = cropDiaryService.createCropDiary(request, image);

        // then
        assertThat(diary).isNotNull();
        assertThat(diary.getCrop()).isEqualTo(mockCrop);
        assertThat(diary.getImage()).isEqualTo("testurl");
        assertThat(diary.getTitle()).isEqualTo(title);
        assertThat(diary.getContent()).isEqualTo(content);
    }
}