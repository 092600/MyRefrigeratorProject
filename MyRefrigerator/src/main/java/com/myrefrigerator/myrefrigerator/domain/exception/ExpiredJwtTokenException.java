package com.myrefrigerator.myrefrigerator.domain.exception;


import org.springframework.security.core.AuthenticationException;

public class ExpiredJwtTokenException extends AuthenticationException {

    public ExpiredJwtTokenException(){
        super("사용시간이 초과된 토큰입니다.");
    }

}
