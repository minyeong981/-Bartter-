package com.ssafy.bartter.crop.dto;

import com.ssafy.bartter.crop.entity.Crop;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public class CropDTO {

    @Getter
    @AllArgsConstructor
    public static class CreateRequest {

        @NotNull
        private final Integer userId;
        @NotNull
        private final Integer cropCategoryId;
        @NotNull
        private final String nickname;
        @NotNull
        private final LocalDate growDate;

        private final MultipartFile image;
        private String description;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private final Integer cropId;
        private final Integer userId;
        private final Integer cropCategoryId;
        private final String nickname;
        private final LocalDate growDate;
        private final String description;
    }

    public static Response toResponse(Crop crop) {
        return new Response(
                crop.getId(),
                crop.getUser().getId(),
                crop.getCategory().getId(),
                crop.getNickname(),
                crop.getGrowDate(),
                crop.getDescription()
        );
    }
}
