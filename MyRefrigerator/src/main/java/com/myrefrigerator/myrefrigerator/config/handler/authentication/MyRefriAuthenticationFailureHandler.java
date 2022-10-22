package com.myrefrigerator.myrefrigerator.config.handler.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myrefrigerator.myrefrigerator.domain.exception.ExpiredJwtTokenException;
import com.myrefrigerator.myrefrigerator.domain.exception.MyRefriJwtSignatureException;
import com.myrefrigerator.myrefrigerator.domain.exception.MyRefriMalformedJwtException;
import com.myrefrigerator.myrefrigerator.domain.exception.OAuth2AuthorizationHeaderNotFoundException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Component
public class MyRefriAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    private ObjectMapper om = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException, UnsupportedEncodingException {
        String errorMessage;

        if (exception instanceof BadCredentialsException) {
            errorMessage = "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해 주세요.";
        } else if (exception instanceof InternalAuthenticationServiceException) {
            errorMessage = "내부적으로 발생한 시스템 문제로 인해 요청을 처리할 수 없습니다. 관리자에게 문의하세요.";
        } else if (exception instanceof AuthenticationCredentialsNotFoundException) {
            errorMessage = "인증 요청이 거부되었습니다. 관리자에게 문의하세요.";
        } else if(exception instanceof OAuth2AuthorizationHeaderNotFoundException){
            errorMessage = "Authorization 헤더와 회원정보 모두 존재하지 않습니다.";
        } else if (exception instanceof ExpiredJwtTokenException) {
            errorMessage = "사용시간이 초과된 토큰입니다.";
        } else if (exception instanceof MyRefriMalformedJwtException) {
            errorMessage = "신뢰할 수 없는 JWT 토큰입니다.";
        } else if (exception instanceof MyRefriJwtSignatureException){
            errorMessage = "신뢰할 수 없는 토큰입니다.";
        } else {
            errorMessage = "알 수 없는 이유로 로그인에 실패하였습니다 관리자에게 문의하세요.";
        }

        response.setCharacterEncoding("utf-8");
        om.writeValue(response.getWriter(), errorMessage);
    }

}
