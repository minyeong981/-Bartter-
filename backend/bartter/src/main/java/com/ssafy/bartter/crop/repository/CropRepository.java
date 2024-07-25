package com.ssafy.bartter.crop.repository;

import com.ssafy.bartter.crop.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crop, Integer> {

}
