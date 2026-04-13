package com.human.musical_community.repository;

import com.human.musical_community.entity.Cast;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CastRepository extends JpaRepository<Cast, Long> {

    // 특정 뮤지컬의 출연진 목록
    List<Cast> findByMusicalMusicalIdOrderByCastNameAsc(Long musicalId);
}
