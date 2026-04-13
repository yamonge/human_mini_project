package com.human.musical_community.dto.response;

import com.human.musical_community.entity.Cast;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter @Builder
@Schema(description = "출연진 응답 DTO")
public class CastResDto {
    private Long castId;
    private Long musicalId;
    private String musicalTitle;
    private String castName;
    private LocalDateTime createdAt;

    public static CastResDto from(Cast c) {
        return CastResDto.builder()
                .castId(c.getCastId())
                .musicalId(c.getMusical().getMusicalId())
                .musicalTitle(c.getMusical().getTitle())
                .castName(c.getCastName())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
