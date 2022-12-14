package com.myrefrigerator.myrefrigerator.config.filter.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myrefrigerator.myrefrigerator.config.domain.jwt.MyRefriJwtTokenProvider;
import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetails;
import com.myrefrigerator.myrefrigerator.domain.exception.ExpiredJwtTokenException;
import com.myrefrigerator.myrefrigerator.domain.exception.MyRefriJwtSignatureException;
import com.myrefrigerator.myrefrigerator.domain.exception.MyRefriMalformedJwtException;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MyRefriJwtAuthorizationFilter extends BasicAuthenticationFilter {
    private MyRefriJwtTokenProvider jwtTokenProvider;
    private UserService userService;

    public MyRefriJwtAuthorizationFilter(AuthenticationManager authenticationManager, MyRefriJwtTokenProvider jwtTokenProvider, UserService userService) {
        super(authenticationManager);
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request.getHeader("Authorization") == null){
            chain.doFilter(request, response);

        } else {
            String jwtHeader = request.getHeader("Authorization");

            if (!jwtHeader.startsWith("Bearer")){
                chain.doFilter(request, response);
            } else {
                try{
                    String jwtToken = request.getHeader("Authorization").replace("Bearer ", "");
                    String email = jwtTokenProvider.getUserEmailInJwtToken(jwtToken);

                    if (email != null && jwtTokenProvider.validateToken(jwtToken)){
                        User user = userService.findByUserEmail(email);

                        MyRefriUserDetails myRefriUserDetails = new MyRefriUserDetails(user);

                        Authentication authentication = jwtTokenProvider.getAuthentication(myRefriUserDetails);
                        SecurityContextHolder.getContext().setAuthentication(authentication);

                        onSuccessfulAuthentication(request, response, authentication);
                    }

                    chain.doFilter(request, response);
                } catch (ExpiredJwtException e){
                    System.out.println(e.getMessage());

                    AuthenticationException authenticationException = new ExpiredJwtTokenException();
                    onUnsuccessfulAuthentication(request, response, authenticationException);
                    return;
                } catch (SignatureException e){
                    System.out.println(e.getMessage());

                    AuthenticationException authenticationException = new MyRefriJwtSignatureException();
                    onUnsuccessfulAuthentication(request, response, authenticationException);
                } catch (MalformedJwtException e){
                    System.out.println(e.getMessage());

                    AuthenticationException authenticationException = new MyRefriMalformedJwtException();
                    onUnsuccessfulAuthentication(request, response, authenticationException);
                }
            }

        }


    }

    @Override
    protected void onSuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, Authentication authResult) throws IOException {
        super.onSuccessfulAuthentication(request, response, authResult);
    }

    @Override
    protected void onUnsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {

        String errorMessage;

        if (failed instanceof ExpiredJwtTokenException) {
            errorMessage = "??????????????? ????????? ???????????????.";
        } else if ((failed instanceof MyRefriJwtSignatureException) || (failed instanceof MyRefriMalformedJwtException)){
            errorMessage = "????????? ??? ?????? JWT ???????????????.";
        } else {
            errorMessage = "??? ??? ?????? ????????? ???????????? ????????????????????? ??????????????? ???????????????.";
        }

        response.setCharacterEncoding("utf-8");

        PrintWriter pw = response.getWriter();
        pw.print(errorMessage);

    }
}

