package com.human.musical_community.dto.response;

import com.human.musical_community.entity.Comment;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter @Builder
@Schema(description = "댓글 응답 DTO")
public class CommentResDto {
    private Long commentId;
    private Long postId;
    private Long userId;
    private String userName;
    private String content;
    private LocalDateTime createdAt;

    public static CommentResDto from(Comment c) {
        return CommentResDto.builder()
                .commentId(c.getCommentId())
                .postId(c.getPost().getPostId())
                .userId(c.getUser().getUserId())
                .userName(c.getUser().getName())
                .content(c.getContent())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
