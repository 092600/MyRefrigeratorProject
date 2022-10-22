package com.myrefrigerator.myrefrigerator.config.filter.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myrefrigerator.myrefrigerator.config.domain.jwt.MyRefriJwtTokenProvider;
import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetails;
import com.myrefrigerator.myrefrigerator.config.handler.authentication.MyRefriAuthenticationFailureHandler;
import com.myrefrigerator.myrefrigerator.config.manager.MyRefriAuthenticationManager;
import com.myrefrigerator.myrefrigerator.domain.exception.MyRefriJwtSignatureException;
import com.myrefrigerator.myrefrigerator.domain.exception.MyRefriMalformedJwtException;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class MyRefriJwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final MyRefriJwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final MyRefriAuthenticationFailureHandler authenticationFailureHandler = new MyRefriAuthenticationFailureHandler();

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("email");
        String password = request.getParameter("password");

        try {
            Authentication authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            Authentication auth = authenticationManager.authenticate(authenticationToken);

            return auth;
        } catch (BadCredentialsException e){
            System.out.println(e.getMessage());
            throw new BadCredentialsException("아이디 또는 비밀번호가 일치하지 않음");
        } catch (MalformedJwtException e){
            System.out.println(e.getMessage());
            throw new MyRefriMalformedJwtException();
        } catch(Exception e){
            e.printStackTrace();
            throw new AuthenticationException("예상치못한 예외 발생") {
                @Override
                public String getMessage() {
                    return super.getMessage();
                }
            };
        }
    }


    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        setAuthenticationFailureHandler(authenticationFailureHandler);
        super.unsuccessfulAuthentication(request, response, failed);
    }

    // attemptAuthentication 실행 후 인증이 정상적으로 완료되면 해당 함수 실행
    // JWT 토큰 발행
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user = userService.findByUserEmail(authResult.getName());
        MyRefriUserDetails myRefriUserDetails = new MyRefriUserDetails(user);

        String jwtToken = jwtTokenProvider.createToken(myRefriUserDetails);
        response.setHeader("Authorization", "Bearer "+jwtToken);
    }


}
