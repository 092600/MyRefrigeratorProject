package com.myrefrigerator.myrefrigerator.domain.exception;


import org.springframework.security.core.AuthenticationException;

public class MyRefriMalformedJwtException extends AuthenticationException {

    public MyRefriMalformedJwtException(){
        super("유효하지 않은 접근입니다.");
    }

}
