package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * CropCategoryRepository
 *
 * @author 김가람
 */
public interface CropCategoryRepository extends JpaRepository<CropCategory, Integer> {
    List<CropCategory> findAllByNameContaining(String name);
}
