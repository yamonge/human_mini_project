package com.human.musical_community.repository;

import com.human.musical_community.entity.Musical;
import com.human.musical_community.entity.enums.MusicalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MusicalRepository extends JpaRepository<Musical, Long> {

    // 제목으로 검색
    List<Musical> findByTitleContainingOrderByCreatedAtDesc(String title);

    // 공연 상태별 조회 (공연중 / 공연예정 / 공연완료)
    List<Musical> findByStatusOrderByStartDateAsc(MusicalStatus status);

    // TODO: 필요한 쿼리 메서드를 추가하세요
    boolean existsByKopisId(String kopisId);
}
