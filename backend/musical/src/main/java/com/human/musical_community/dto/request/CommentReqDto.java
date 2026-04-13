package com.human.musical_community.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Schema(description = "댓글 작성 요청 DTO")
public class CommentReqDto {
    @Schema(description = "작성자 userId", example = "1")
    private Long userId;
    @Schema(example = "저도 봤어요! 강추입니다!")
    private String content;
}
