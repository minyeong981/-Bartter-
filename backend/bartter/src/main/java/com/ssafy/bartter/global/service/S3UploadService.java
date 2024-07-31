package com.ssafy.bartter.global.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.util.IOUtils;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.*;

/**
 * 이미지 업로드 서비스 객체
 *
 * @author 김용수
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class S3UploadService {

    /**
     * 이미지 업로드를 위한 AmazonS3
     */
    private final AmazonS3 amazonS3;

    /**
     * 유효한 확장자 리스트
     */
    private final List<String> allowExtensionList = Arrays.asList("jpg", "jpeg", "png", "gif");

    /**
     * 버킷명
     */
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    /**
     * prefix 주소
     */
    @Value("${cloud.aws.url}")
    private String url;

    /**
     * 이미지 업로드 메서드 - 파일이 존재하는지 확인한다.
     *
     * @param image 이미지 파일
     * @return 이미지 업로드 url
     */
    public String upload(MultipartFile image) {
        if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) {
            throw new CustomException(ErrorCode.EMPTY_FILE);
        }
        return url + uploadImage(image);
    }

    /**
     * 유효한지 확인 후 유효하다면 파일 업로드
     *
     * @param image
     * @return
     */
    private String uploadImage(MultipartFile image) {
        checkImageFile(image.getOriginalFilename());
        try {
            return uploadToS3(image);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.FAIL_TO_CREATE_FILE);
        }
    }

    /**
     * 실제로 AWS S3에 이미지를 업로드 하는 코드
     *
     * @param image 이미지 파일
     * @return 이미지가 업로드 된 url
     * @throws IOException
     */
    private String uploadToS3(MultipartFile image) throws IOException {
        String originalFileName = image.getOriginalFilename(); // 원본 파일 이름
        String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1); // 파일 확장자

        // UUID를 사용하여 고유한 파일 이름 생성
        String s3FileName = UUID.randomUUID().toString().substring(0, 14);

        // MultipartFile의 InputStream을 가져온 뒤, 바이트 배열로 변환
        byte[] bytes = IOUtils.toByteArray(image.getInputStream());

        ObjectMetadata metadata = new ObjectMetadata(); // S3에 업로드할 파일의 메타데이터 설정
        metadata.setContentType("image/" + extension); // 콘텐츠 타입 설정
        metadata.setContentLength(bytes.length); // 콘텐츠 길이 설정

        // 바이트 배열을 사용하여 ByteArrayInputStream 생성
        try (ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes)) {
            // S3에 파일 업로드 요청 생성
            PutObjectRequest putRequest = new PutObjectRequest(bucketName, s3FileName, byteArrayInputStream, metadata);
            amazonS3.putObject(putRequest); // S3 파일 업로드
        } catch (Exception e) {
            throw new CustomException(ErrorCode.FAIL_TO_CREATE_FILE);
        }

        return amazonS3.getUrl(bucketName, s3FileName).getPath();
    }

    /**
     * 현재 파일 확장자가 이미지인지 확인하는 메서드
     *
     * @param imageFileName 업로드 할 파일 이름
     */
    private void checkImageFile(String imageFileName) {
        int extensionIdx = imageFileName.lastIndexOf(".");
        if (extensionIdx == -1) {
            throw new CustomException(ErrorCode.NOT_SUPPORTED_EXTENSION);
        }
        String extension = imageFileName.substring(extensionIdx + 1).toLowerCase();

        if (!allowExtensionList.contains(extension)) {
            throw new CustomException(ErrorCode.NOT_SUPPORTED_EXTENSION);
        }
    }

    /**
     * 이미지 Url 삭제 메서드
     *
     * @param imageUrl AWS S3 ImageUrl
     */
    public void delete(String imageUrl) {
        try {
            String key = getObjectNameFromUrl(imageUrl);
            amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
        } catch (Exception e) {
            throw new CustomException(ErrorCode.FAIL_TO_DELETE_FILE);
        }
    }

    /**
     * Url key 추출 메서드
     * @param imageUrl
     * @return Object의 Key값
     */
    private String getObjectNameFromUrl(String imageUrl) {
        if (imageUrl == null || !imageUrl.contains("/")) {
            throw new CustomException(ErrorCode.FAIL_TO_DELETE_FILE);
        }
        return imageUrl.substring(imageUrl.indexOf("/") + 1);
    }
}
