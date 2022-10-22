package com.myrefrigerator.myrefrigerator.domain.exception;


import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthorizationHeaderNotFoundException extends AuthenticationException {

    public OAuth2AuthorizationHeaderNotFoundException(){
        super("AuthorizationHeader가 없습니다.");
    }

}
