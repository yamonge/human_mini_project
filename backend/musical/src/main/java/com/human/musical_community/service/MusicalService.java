package com.human.musical_community.service;

import com.human.musical_community.dto.request.MusicalReqDto;
import com.human.musical_community.dto.response.MusicalResDto;
import com.human.musical_community.entity.Musical;
import com.human.musical_community.entity.enums.MusicalStatus;
import com.human.musical_community.repository.MusicalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MusicalService {

    private final MusicalRepository musicalRepository;

    /**
     * 뮤지컬 등록
     * TODO: dto의 값으로 Musical 엔티티를 생성하고 저장 후 MusicalResDto로 반환하세요.
     */
    public MusicalResDto saveMusical(MusicalReqDto dto) {
        // TODO: Musical 엔티티 생성 (Builder 패턴 사용)
        // TODO: musicalRepository.save() 호출
        // TODO: MusicalResDto.from() 으로 변환해서 반환
        return null;
    }

    /**
     * 뮤지컬 전체 목록 조회 (최신순)
     * TODO: musicalRepository에서 전체 조회 후 MusicalResDto 리스트로 반환하세요.
     */
    @Transactional(readOnly = true)
    public List<MusicalResDto> getMusicalList() {
        // TODO: findAll() 또는 정렬된 조회 메서드 사용
        return null;
    }

    /**
     * 뮤지컬 단건 조회
     * TODO: musicalId로 조회 후 없으면 예외 발생, 있으면 MusicalResDto로 반환하세요.
     */
    @Transactional(readOnly = true)
    public MusicalResDto getMusical(Long musicalId) {
        // TODO: findById() 사용, 없으면 IllegalArgumentException 발생
        return null;
    }

    /**
     * 공연 상태별 조회
     * TODO: status에 해당하는 뮤지컬 목록을 반환하세요.
     */
    @Transactional(readOnly = true)
    public List<MusicalResDto> getMusicalListByStatus(MusicalStatus status) {
        // TODO: findByStatusOrderByStartDateAsc() 사용
        return null;
    }

    /**
     * 제목 검색
     * TODO: keyword가 포함된 뮤지컬 목록을 반환하세요.
     */
    @Transactional(readOnly = true)
    public List<MusicalResDto> searchMusical(String keyword) {
        // TODO: findByTitleContainingOrderByCreatedAtDesc() 사용
        return null;
    }

    /**
     * 뮤지컬 수정
     * TODO: musicalId로 조회 후 dto의 값으로 필드를 업데이트하고 저장하세요.
     */
    public MusicalResDto updateMusical(Long musicalId, MusicalReqDto dto) {
        // TODO: findById() → 필드 업데이트 → save() → MusicalResDto 반환
        return null;
    }

    /**
     * 뮤지컬 삭제
     * TODO: musicalId로 조회 후 삭제하세요.
     */
    public void deleteMusical(Long musicalId) {
        // TODO: findById() → delete()
    }

    // 공통 조회 메서드 - 아래 코드는 완성되어 있어요! 참고해서 위 TODO를 채우세요.
    private Musical findMusicalById(Long musicalId) {
        return musicalRepository.findById(musicalId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 뮤지컬입니다. musicalId=" + musicalId));
    }
}
