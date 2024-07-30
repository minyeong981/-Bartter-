package com.ssafy.bartter.community.repository;

import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.global.common.Location;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface CommunityPostRepositoryCustom {
    public List<CommunityPost> findPostListByParams(String keyword, List<Location> nearbyLocationList, PageRequest pageable);
}
