package com.ssafy.bartter.crop.repository;

import com.ssafy.bartter.crop.entity.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropCategoryRepository extends JpaRepository<CropCategory, Integer> {
}
