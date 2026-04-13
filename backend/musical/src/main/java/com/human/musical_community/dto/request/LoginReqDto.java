package com.human.musical_community.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
@Schema(description = "로그인 요청 DTO")
public class LoginReqDto {
    @Schema(example = "hong@musical.com")
    private String email;
    @Schema(example = "1234")
    private String password;
}
