package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropCategoryRepository extends JpaRepository<CropCategory, Integer> {
}
