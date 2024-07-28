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
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static com.ssafy.bartter.crop.dto.CropDiaryDto.Create;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;


/**
 * @Author 김가람
 *
 * CropDiaryService 메소드 테스트
 * */
@ExtendWith(MockitoExtension.class)
class CropDiaryServiceTest {

    @Mock
    private CropRepository cropRepository;

    @Mock
    private S3UploadService s3UploadService;

    @Spy
    private CropDiaryRepository cropDiaryRepository;

    @InjectMocks
    private CropDiaryService cropDiaryService;

    @DisplayName("요청한 정보와 동일한 정보를 가진 농사일지를 생성한다.")
    @Test
    void 농사일지_생성() {
        // given
        Create request = getRequest();
        Crop mockCrop = mock(Crop.class);
        MultipartFile image = mock(MultipartFile.class);

        given(cropRepository.findById(request.getCropId())).willReturn(Optional.of(mockCrop));
        given(s3UploadService.upload(image)).willReturn("testurl");

        // when
        CropDiary diary = cropDiaryService.createCropDiary(request, image);

        // then
        assertThat(diary).isNotNull();
        assertThat(diary.getCrop()).isEqualTo(mockCrop);
        assertThat(diary.getImage()).isEqualTo("testurl");
        assertThat(diary.getTitle()).isEqualTo(request.getTitle());
        assertThat(diary.getContent()).isEqualTo(request.getContent());
    }

    @DisplayName("농사일지 ID로 농사일지를 조회한다.")
    @Test
    void 농사일지_조회() {
        // given
        Create request = getRequest();
        Crop mockCrop = mock(Crop.class);
        MultipartFile image = mock(MultipartFile.class);

        given(cropRepository.findById(request.getCropId())).willReturn(Optional.of(mockCrop));
        given(s3UploadService.upload(image)).willReturn("testurl");

        // spy는 실제 객체를 감싸는 객체로, 실제 객체의 메서드를 호출하면서 특정 메서드를 모킹할 수 있음
        // spy를 쓰지 않으면 cropDiaryService는 모킹된 객체가 아닌 실제 createCropDiary의 결과를 반환하여 모킹이 불가능
        CropDiary diary = spy(cropDiaryService.createCropDiary(request, image));

        given(diary.getId()).willReturn(1);
        given(cropDiaryRepository.findById(1)).willReturn(Optional.of(diary));

        // when
        CropDiary findDiary = cropDiaryService.getCropDiary(1);

        // then
        assertThat(findDiary).isEqualTo(diary);
        assertThat(findDiary.getId()).isEqualTo(1);
    }

    @DisplayName("농사일지 ID를 통해 농사일지를 삭제힌다.")
    @Test
    void 농사일지_삭제() {
        // given
        CropDiary diary = mock(CropDiary.class);
        given(cropDiaryRepository.findById(1)).willReturn(Optional.of(diary));

        // when
        cropDiaryService.deleteCropDiary(1);

        // then
        verify(cropDiaryRepository, times(1)).delete(diary);
    }


    private static Create getRequest() {
        Integer cropId = 1;
        String title = "title";
        String content = "content";

        return new Create(cropId, title, content);
    }
}