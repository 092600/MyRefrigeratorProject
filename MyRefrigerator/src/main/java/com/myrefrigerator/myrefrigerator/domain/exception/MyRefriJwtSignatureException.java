package com.myrefrigerator.myrefrigerator.domain.exception;


import org.springframework.security.core.AuthenticationException;

public class MyRefriJwtSignatureException extends AuthenticationException {

    public MyRefriJwtSignatureException(){
        super("JWT signature does not match locally computed signature. JWT validity cannot be asserted and should not be trusted.");
    }

}
