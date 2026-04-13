package com.human.musical_community.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Schema(description = "게시글 등록/수정 요청 DTO")
public class PostReqDto {
    @Schema(description = "작성자 userId", example = "1")
    private Long userId;
    @Schema(example = "레미제라블 후기")
    private String title;
    @Schema(example = "정말 감동적이었습니다!")
    private String content;
    @Schema(example = "후기")
    private String category;
}
