package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.user.entity.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
                    + " AND (:year = 0 OR YEAR(d.performDate) = :year)"
                    + " AND (:month = 0 OR MONTH(d.performDate) = :month)"
    )
    List<CropDiary> findAllByDateAndCrop(
            @Param("year") int year,
            @Param("month") int month,
            @Param("userId") int userId,
            PageRequest pageable
    );

    @Query(
            "SELECT d FROM CropDiary d"
                    + " LEFT JOIN FETCH d.crop c"
                    + " LEFT JOIN FETCH c.user u"
                    + " WHERE c.user in :userList"
    )
    List<CropDiary> findAllByUserList(
            @Param("userList") List<User> userList,
            PageRequest pageable
    );

    List<CropDiary> findAllByCropId(int cropId);

    @Query(
            "SELECT d FROM CropDiary d"
                    + " LEFT JOIN FETCH d.crop c"
                    + " WHERE c.id = :cropId"
                    + " AND (d.createdAt BETWEEN :startDateTime AND :endDateTime)"
    )
    List<CropDiary> findAllByCropIdAndDateRange(
            @Param("cropId") int cropId,
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime);

    @Query(
            "SELECT DISTINCT d.performDate FROM CropDiary d"
                    + " WHERE d.crop.user.id = :userId"
                    + " AND YEAR(d.performDate) = :year"
                    + " AND MONTH(d.performDate) = :month"
    )
    List<LocalDate> findDiaryWrittenDateList(
            @Param("userId") int userId,
            @Param("year") int year,
            @Param("month") int month);


    @Query(
            "SELECT d FROM CropDiary d"
                    + " LEFT JOIN FETCH d.crop c"
                    + " WHERE d.crop.user.id = :userId"
                    + " AND d.performDate = :date"
    )
    List<CropDiary> findByUserIdAndPerformDate(
            @Param("userId") int userId,
            @Param("date") LocalDate date);
}
