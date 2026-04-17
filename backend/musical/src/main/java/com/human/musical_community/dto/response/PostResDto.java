package com.human.musical_community.dto.response;

import com.human.musical_community.entity.Post;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter @Builder
@Schema(description = "게시글 응답 DTO")
public class PostResDto {
    private Long postId;
    private Long userId;
    private String userName;
    private String title;
    private String content;
    private String category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int commentCount;

    public static PostResDto from(Post p) {
        return PostResDto.builder()
                .postId(p.getPostId())
                .userId(p.getUser().getUserId())
                .userName(p.getUser().getName())
                .title(p.getTitle())
                .content(p.getContent())
                .category(p.getCategory())
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .commentCount(p.getComments() != null ? p.getComments().size() : 0)
                .build();
    }
}
