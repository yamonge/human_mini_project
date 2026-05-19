# Curtain Call (human_mini_project)

뮤지컬 공연 정보와 커뮤니티 기능을 제공하는 풀스택 미니 프로젝트입니다.

| 구분 | 기술 |
|------|------|
| Backend | Spring Boot 3.4, Spring Security, JPA, Java 17, MySQL |
| Frontend | React 19, React Router, styled-components, axios |
| External API | [KOPIS](https://www.kopis.or.kr/) 공연·공연시설 API |

## 주요 기능

- 뮤지컬·출연진 정보 조회 (KOPIS 연동)
- 게시글·댓글·리뷰 커뮤니티
- 회원가입·로그인·아이디·비밀번호 찾기
- 공연 시설 지도 (react-naver-maps)

## 프로젝트 구조

```
human_mini_project/
├── backend/musical/          # Spring Boot API
└── frontend/curtain_call/    # React SPA
```

## 사전 요구 사항

- JDK 17+
- Node.js 18+ (npm 또는 yarn)
- MySQL 8+

## 실행 방법

### 1. 데이터베이스

MySQL에 DB를 생성합니다.

```sql
CREATE DATABASE musical_community CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

`backend/musical/src/main/resources/application.properties`에서 접속 정보를 환경에 맞게 수정합니다.

### 2. 백엔드

```bash
cd backend/musical
./gradlew bootRun
```

- API: `http://localhost:8111`
- Swagger UI: `http://localhost:8111/swagger-ui.html`

KOPIS API 키는 [공연예술통합전산망](https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do)에서 발급 후 `kopis.api.key`에 설정합니다.

### 3. 프론트엔드

```bash
cd frontend/curtain_call
npm install
npm start
```

- 화면: `http://localhost:3000`
- API 주소는 `frontend/curtain_call/src/api/AxiosApi.js`의 `BASE_URL`에서 변경할 수 있습니다.

## 팀

5인 팀 프로젝트 · 백엔드·프론트엔드 총괄

## 라이선스

교육용 미니 프로젝트입니다.
