package com.human.musical_community.controller;

import com.human.musical_community.dto.request.MusicalReqDto;
import com.human.musical_community.dto.response.ApiResponse;
import com.human.musical_community.dto.response.MusicalResDto;
import com.human.musical_community.entity.enums.MusicalStatus;
import com.human.musical_community.service.MusicalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/musicals")
@RequiredArgsConstructor
@Tag(name = "Musical", description = "뮤지컬 정보 CRUD API")
public class MusicalController {

    private final MusicalService musicalService;

    @Operation(summary = "뮤지컬 등록")
    @PostMapping
    public ResponseEntity<ApiResponse<MusicalResDto>> saveMusical(@RequestBody MusicalReqDto dto) {
        // TODO: musicalService.saveMusical() 구현 후 아래 주석 제거
        // return ResponseEntity.ok(ApiResponse.ok("뮤지컬 등록 성공", musicalService.saveMusical(dto)));
        return ResponseEntity.ok(ApiResponse.fail("TODO: MusicalService.saveMusical() 구현 필요"));
    }

    @Operation(summary = "뮤지컬 전체 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<MusicalResDto>>> getMusicalList() {
        // TODO: musicalService.getMusicalList() 구현 후 아래 주석 제거
        // return ResponseEntity.ok(ApiResponse.ok("뮤지컬 목록 조회 성공", musicalService.getMusicalList()));
        return ResponseEntity.ok(ApiResponse.fail("TODO: MusicalService.getMusicalList() 구현 필요"));
    }

    @Operation(summary = "뮤지컬 단건 조회")
    @GetMapping("/{musicalId}")
    public ResponseEntity<ApiResponse<MusicalResDto>> getMusical(
            @Parameter(description = "뮤지컬 ID", example = "1")
            @PathVariable Long musicalId) {
        // TODO: musicalService.getMusical() 구현 후 아래 주석 제거
        // return ResponseEntity.ok(ApiResponse.ok("뮤지컬 조회 성공", musicalService.getMusical(musicalId)));
        return ResponseEntity.ok(ApiResponse.fail("TODO: MusicalService.getMusical() 구현 필요"));
    }

    @Operation(summary = "공연 상태별 조회", description = "공연중 / 공연예정 / 공연완료")
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<MusicalResDto>>> getMusicalListByStatus(
            @Parameter(description = "공연 상태", example = "공연중")
            @PathVariable MusicalStatus status) {
        // TODO: musicalService.getMusicalListByStatus() 구현 후 아래 주석 제거
        // return ResponseEntity.ok(ApiResponse.ok("상태별 뮤지컬 조회 성공", musicalService.getMusicalListByStatus(status)));
        return ResponseEntity.ok(ApiResponse.fail("TODO: MusicalService.getMusicalListByStatus() 구현 필요"));
    }

    @Operation(summary = "제목 키워드 검색")
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<MusicalResDto>>> searchMusical(
            @Parameter(description = "검색 키워드", example = "레미제라블")
            @RequestParam String keyword) {
        // TODO: musicalService.searchMusical() 구현 후 아래 주석 제거
        // return ResponseEntity.ok(ApiResponse.ok("뮤지컬 검색 성공", musicalService.searchMusical(keyword)));
        return ResponseEntity.ok(ApiResponse.fail("TODO: MusicalService.searchMusical() 구현 필요"));
    }

    @Operation(summary = "뮤지컬 수정")
    @PutMapping("/{musicalId}")
    public ResponseEntity<ApiResponse<MusicalResDto>> updateMusical(
            @PathVariable Long musicalId, @RequestBody MusicalReqDto dto) {
        // TODO: musicalService.updateMusical() 구현 후 아래 주석 제거
        // return ResponseEntity.ok(ApiResponse.ok("뮤지컬 수정 성공", musicalService.updateMusical(musicalId, dto)));
        return ResponseEntity.ok(ApiResponse.fail("TODO: MusicalService.updateMusical() 구현 필요"));
    }

    @Operation(summary = "뮤지컬 삭제")
    @DeleteMapping("/{musicalId}")
    public ResponseEntity<ApiResponse<Void>> deleteMusical(@PathVariable Long musicalId) {
        // TODO: musicalService.deleteMusical() 구현 후 아래 주석 제거
        // musicalService.deleteMusical(musicalId);
        // return ResponseEntity.ok(ApiResponse.ok("뮤지컬 삭제 성공"));
        return ResponseEntity.ok(ApiResponse.fail("TODO: MusicalService.deleteMusical() 구현 필요"));
    }
}
