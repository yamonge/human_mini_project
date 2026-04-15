package com.human.musical_community.controller;

import com.human.musical_community.dto.request.CastReqDto;
import com.human.musical_community.dto.response.ApiResponse;
import com.human.musical_community.dto.response.CastResDto;
import com.human.musical_community.service.CastService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/musicals/{musicalId}/casts")
@RequiredArgsConstructor
@Tag(name = "Cast", description = "출연진 관리 API")
public class CastController {

    private final CastService castService;

    @Operation(summary = "출연진 등록")
    @PostMapping
    public ResponseEntity<ApiResponse<CastResDto>> saveCast(
            @Parameter(description = "뮤지컬 ID", example = "1") @PathVariable Long musicalId,
            @RequestBody CastReqDto dto) {
        // TODO: castService.saveCast() 구현 후 아래 주석 제거
        // TODO: 현재 외부 API사용으로 작업X
        // return ResponseEntity.ok(ApiResponse.ok("출연진 등록 성공", castService.saveCast(musicalId, dto)));
        return ResponseEntity.ok(ApiResponse.fail("TODO: CastService.saveCast() 구현 필요"));
    }

    @Operation(summary = "출연진 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<CastResDto>>> getCastList(
            @Parameter(description = "뮤지컬 ID", example = "1") @PathVariable Long musicalId) {
        // TODO: castService.getCastList() 구현 후 아래 주석 제거
        // TODO: 현재 뮤지컬엔티티에 String으로 저장중임으로 작업X
        // return ResponseEntity.ok(ApiResponse.ok("출연진 목록 조회 성공", castService.getCastList(musicalId)));
        return ResponseEntity.ok(ApiResponse.fail("TODO: CastService.getCastList() 구현 필요"));
    }

    @Operation(summary = "출연진 삭제")
    @DeleteMapping("/{castId}")
    public ResponseEntity<ApiResponse<Void>> deleteCast(
            @PathVariable Long musicalId,
            @Parameter(description = "출연진 ID", example = "1") @PathVariable Long castId) {
        // TODO: castService.deleteCast() 구현 후 아래 주석 제거
        // TODO: 현재 외부 API임으로 작업X
        // castService.deleteCast(castId);
        // return ResponseEntity.ok(ApiResponse.ok("출연진 삭제 성공"));
        return ResponseEntity.ok(ApiResponse.fail("TODO: CastService.deleteCast() 구현 필요"));
    }
}
