package com.human.musical_community.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("🎵 뮤지컬 커뮤니티 API")
                        .description("""
                                뮤지컬 커뮤니티 서비스 API 명세서
                                
                                [구현 기능]
                                - Auth    : 회원가입 / 로그인
                                - User    : 회원 정보 조회 / 수정
                                - Post    : 게시글 CRUD (커뮤니티 게시판)
                                - Comment : 댓글 CRUD
                                - Musical : 뮤지컬 정보 CRUD  ← 구현 필요
                                - Review  : 뮤지컬 리뷰 CRUD  ← 구현 필요
                                - Cast    : 출연진 관리        ← 구현 필요
                                """)
                        .version("v1.0.0")
                        .contact(new Contact().name("1조 - 뮤지컬 커뮤니티")));
    }
}
