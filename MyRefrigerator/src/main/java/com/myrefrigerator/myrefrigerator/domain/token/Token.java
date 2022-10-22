package com.myrefrigerator.myrefrigerator.domain.token;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userEmail;
    private String access_token;
    private String refresh_token;
    private String token_type;
    private String expires_in;
    private String jwt_token;

    public void update(Token token, String jwt_token){
        this.access_token = token.getAccess_token();
        this.refresh_token = token.getAccess_token();
        this.token_type = token.getToken_type();
        this.expires_in = token.getExpires_in();
        this.jwt_token = jwt_token;
    }
}
