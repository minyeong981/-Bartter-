package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.CropReport;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CropReportRepository extends JpaRepository<CropReport, Integer> {

    @Query(
            "SELECT r FROM CropReport r"
            + " LEFT JOIN FETCH r.crop c"
            + " WHERE r.user.id = :userId"
            + " AND (r.createdAt BETWEEN :startDate AND :endDate)"
    )
    List<CropReport> findAllByDates(
            @Param("userId") int userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate")LocalDate endDate,
            Sort sort);
}
