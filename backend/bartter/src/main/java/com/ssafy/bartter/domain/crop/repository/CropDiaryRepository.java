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
import java.util.Optional;

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
                    + " WHERE d.id = :cropDiaryId"
    )
    Optional<CropDiary> findById(
            @Param("cropDiaryId") int cropDiaryId
    );

    @Query(
            "SELECT d FROM CropDiary d"
                    + " LEFT JOIN FETCH d.crop c"
                    + " LEFT JOIN FETCH c.user u"
                    + " WHERE c.id = :cropId"
    )
    List<CropDiary> findAllByCropId(
            @Param("cropId") int cropId
    );

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


    @Query(
            "SELECT d FROM CropDiary d"
                    + " LEFT JOIN FETCH d.crop c"
                    + " WHERE c.id = :cropId"
                    + " AND (d.performDate BETWEEN :startDate AND :endDate)"
    )
    List<CropDiary> findAllByCropIdAndDateRange(
            @Param("cropId") int cropId,
            @Param("startDate") LocalDate startDateTime,
            @Param("endDate") LocalDate endDateTime);

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
