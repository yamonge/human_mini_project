package com.human.musical_community.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor
@Schema(description = "회원가입 요청 DTO")
public class SignUpReqDto {
    @Schema(example = "hong@musical.com")
    private String email;
    @Schema(example = "1234")
    private String password;
    @Schema(example = "홍길동")
    private String name;
    @Schema(description = "생년월일", example = "1995-03-15")
    private LocalDate birthDate;
}
