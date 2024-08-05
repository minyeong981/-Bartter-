package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.CropReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropReportRepository extends JpaRepository<CropReport, Integer> {
}
