package com.ssafy.bartter.crop.repository;

import com.ssafy.bartter.crop.entity.CropDiary;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * CropDiaryRepository
 *
 * @author 김가람
 */
public interface CropDiaryRepository extends JpaRepository<CropDiary, Integer> {

    // TODO : Fetch Join 사용
    @Query(
            "SELECT d FROM CropDiary d"
            + " WHERE d.crop.user.id = :userId"
            + " AND (:cropId IS NULL OR d.crop.id = :cropId)"
            + " AND (:year IS NULL OR YEAR(d.createdAt) = :year)"
            + " AND (:month IS NULL OR MONTH(d.createdAt) = :month)"
    )
    List<CropDiary> findAllByDateAndCrop(
            @Param("year") Integer year,
            @Param("month") Integer month,
            @Param("cropId") Integer cropId,
            @Param("userId") Integer userId,
            PageRequest pageable
    );
}
