package com.human.musical_community.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Schema(description = "출연진 등록 요청 DTO")
public class CastReqDto {
    @Schema(description = "배우 이름", example = "김철수")
    private String castName;
}
