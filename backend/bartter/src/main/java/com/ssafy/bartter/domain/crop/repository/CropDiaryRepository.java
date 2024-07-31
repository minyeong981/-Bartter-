package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.CropDiary;
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

    @Query(
            "SELECT d FROM CropDiary d"
                    + " LEFT JOIN FETCH d.crop c"
                    + " LEFT JOIN FETCH c.user u"
                    + " WHERE c.user.id = :userId"
                    + " AND (:year = 0 OR YEAR(d.createdAt) = :year)"
                    + " AND (:month = 0 OR MONTH(d.createdAt) = :month)"
    )
    List<CropDiary> findAllByDateAndCrop(
            @Param("year") int year,
            @Param("month") int month,
            @Param("userId") int userId,
            PageRequest pageable
    );

    List<CropDiary> findAllByCropId(int cropId);
}
