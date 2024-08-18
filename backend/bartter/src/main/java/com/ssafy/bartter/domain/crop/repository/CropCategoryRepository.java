package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.CropCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * CropCategoryRepository
 *
 * @author 김가람
 */
public interface CropCategoryRepository extends JpaRepository<CropCategory, Integer> {

    List<CropCategory> findAllByNameContaining(String name);

    @Query("SELECT cc FROM CropCategory  cc " +
            "WHERE cc.id IN :idList")
    List<CropCategory> findAllById(@Param("idList") List<Integer> idList);
}
