package com.human.musical_community.service;

import com.human.musical_community.dto.request.FindIdReqDto;
import com.human.musical_community.dto.request.LoginReqDto;
import com.human.musical_community.dto.request.SignUpReqDto;
import com.human.musical_community.dto.response.FindIdResDto;
import com.human.musical_community.dto.response.LoginResDto;
import com.human.musical_community.entity.User;
import com.human.musical_community.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;  // BCrypt

    // 이메일 중복 확인 (true = 사용 가능)
    public boolean checkEmail(String email) {
        return !userRepository.existsByEmail(email);
    }

    // 회원가입
    public void signUp(SignUpReqDto dto) {
        // 이메일 중복 검사
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        User user = User.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))  // BCrypt 암호화
                .name(dto.getName())
                .birthDate(dto.getBirthDate())
                .isAdmin(0)
                .build();

        userRepository.save(user);
        log.info("회원가입 완료: {}", dto.getEmail());
    }

    // 로그인 - 성공 시 LoginResDto 반환, 실패 시 예외
    @Transactional(readOnly = true)
    public LoginResDto login(LoginReqDto dto) {
        // 이메일로 회원 조회
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));

        System.out.println("service : " + user);

        // BCrypt 비밀번호 검증
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        log.info("로그인 성공: {}", dto.getEmail());

        // 로그인 성공 → React에서 localStorage에 저장할 정보 반환
        return LoginResDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .isAdmin(user.getIsAdmin() == 1)
                .build();
    }

    public FindIdResDto findId(FindIdReqDto dto){
        User user = userRepository.findByNameAndBirthDate(dto.getName(), dto.getBirthDate())
                .orElseThrow(() -> new IllegalArgumentException("해당 정보에대한 이메일이 존재하지 않습니다."));

        return FindIdResDto.builder()
                .email(user.getEmail())
                .build();
    }
}
