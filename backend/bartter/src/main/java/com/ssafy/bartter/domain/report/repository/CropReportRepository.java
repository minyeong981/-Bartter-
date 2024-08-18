package com.ssafy.bartter.domain.report.repository;

import com.ssafy.bartter.domain.report.entity.CropReport;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CropReportRepository extends JpaRepository<CropReport, Integer> {

    @Query(
            "SELECT r FROM CropReport r"
            + " LEFT JOIN FETCH r.crop c"
            + " WHERE r.user.id = :userId"
            + " AND (r.createdAt BETWEEN :startDateTime AND :endDateTime)"
    )
    List<CropReport> findAllByDates(
            @Param("userId") int userId,
            @Param("startDateTime") LocalDateTime startDateTime,
            @Param("endDateTime") LocalDateTime endDateTime,
            Sort sort);

    @Query(
            "SELECT r FROM CropReport r"
                    + " LEFT JOIN FETCH r.crop c"
                    + " WHERE r.id = :cropReportId"
    )
    Optional<CropReport> findById(
            @Param("cropReportId") int cropReportId
    );
}
