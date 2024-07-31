package com.ssafy.bartter.crop.repository;

import com.ssafy.bartter.crop.entity.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CropCategoryRepository extends JpaRepository<CropCategory, Integer> {
    List<CropCategory> findAllByNameContaining(String name);
}
