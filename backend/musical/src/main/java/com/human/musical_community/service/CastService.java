package com.human.musical_community.service;

import com.human.musical_community.dto.request.CastReqDto;
import com.human.musical_community.dto.response.CastResDto;
import com.human.musical_community.entity.Cast;
import com.human.musical_community.entity.Musical;
import com.human.musical_community.repository.CastRepository;
import com.human.musical_community.repository.MusicalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CastService {

    private final CastRepository castRepository;
    private final MusicalRepository musicalRepository;

    /**
     * 출연진 등록
     * TODO: musicalId의 뮤지컬에 배우를 추가하세요.
     */
    public CastResDto saveCast(Long musicalId, CastReqDto dto) {
        // TODO: musicalRepository.findById() 로 뮤지컬 조회
        // TODO: Cast 엔티티 생성 후 저장
        return null;
    }

    /**
     * 특정 뮤지컬 출연진 목록 조회
     * TODO: musicalId에 해당하는 출연진 목록을 반환하세요.
     */
    @Transactional(readOnly = true)
    public List<CastResDto> getCastList(Long musicalId) {
        // TODO: findByMusicalMusicalIdOrderByCastNameAsc() 사용
        return null;
    }

    /**
     * 출연진 삭제
     * TODO: castId로 조회 후 삭제하세요.
     */
    public void deleteCast(Long castId) {
        // TODO: findById() → delete()
    }
}
