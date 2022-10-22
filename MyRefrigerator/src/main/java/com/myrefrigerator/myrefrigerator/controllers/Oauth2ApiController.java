package com.myrefrigerator.myrefrigerator.controllers;

import com.myrefrigerator.myrefrigerator.config.domain.jwt.MyRefriJwtTokenProvider;
import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetails;
import com.myrefrigerator.myrefrigerator.domain.restTemplate.TokenRestTemplate;
import com.myrefrigerator.myrefrigerator.domain.token.Token;
import com.myrefrigerator.myrefrigerator.domain.token.TokenService;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserRepository;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import com.nimbusds.jose.shaded.json.parser.ParseException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.servlet.http.HttpServletResponse;
import java.net.URISyntaxException;

@RequiredArgsConstructor
@RestController
public class Oauth2ApiController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final MyRefriJwtTokenProvider myRefriJwtTokenProvider;
    private final TokenRestTemplate tokenRestTemplate;

    @PostMapping("/login/oauth/naver/token")
    public String naverAccessToken(@RequestBody Token token, HttpServletResponse response) throws URISyntaxException, ParseException {
        try{
            User u = tokenRestTemplate.getNaverUser(token);

            if (!userService.isExistUserEmail(u.getEmail())) {
                userService.signUpSocial(u);

                MyRefriUserDetails user = new MyRefriUserDetails(u);
                String jwtToken = myRefriJwtTokenProvider.createToken(user);

                Authentication authentication = myRefriJwtTokenProvider.getAuthentication(user);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                token.setUserEmail(u.getEmail());
                token.setJwt_token(jwtToken);

                boolean isSigned = tokenService.saveToken(token);

                if (isSigned){
                    response.setHeader("Authorization", "Bearer "+jwtToken);
                    return "토큰이 정상적으로 발급되었습니다.";

                } else {
                    return "토큰을 저장하는 과정에서 문제가 발생하였습니다.";
                }

            } else {
                User findUser = userService.findByUserEmail(u.getEmail());
                MyRefriUserDetails findU = new MyRefriUserDetails(findUser);

                String jwtToken = tokenService.updateToken(token, findU);

                Authentication authentication = myRefriJwtTokenProvider.getAuthentication(findU);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                response.setHeader("Authorization", "Bearer "+jwtToken);
                return "토큰이 정상적으로 발급되었습니다.";
            }
        } catch (HttpClientErrorException e){
            return "access token이 만료되었습니다.";
        } catch (Exception e){
            System.out.println(e.getMessage());
            return "알수없는 예외가 발생했습니다.";
        }
    }

    @PostMapping("/login/oauth/google/token")
    public String googleAccessToken(@RequestBody Token token, HttpServletResponse response) throws URISyntaxException, ParseException {
        try{
            User u = tokenRestTemplate.getGoogleUser(token);
            if (!userService.isExistUserEmail(u.getEmail())) {
                userService.signUpSocial(u);

                MyRefriUserDetails user = new MyRefriUserDetails(u);
                String jwtToken = myRefriJwtTokenProvider.createToken(user);

                Authentication authentication = myRefriJwtTokenProvider.getAuthentication(user);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                token.setUserEmail(u.getEmail());
                token.setJwt_token(jwtToken);

                boolean isSigned = tokenService.saveToken(token);

                if (isSigned){
                    response.setHeader("Authorization", "Bearer "+jwtToken);
                    return "토큰이 정상적으로 발급되었습니다.";

                } else {
                    return "토큰을 저장하는 과정에서 문제가 발생하였습니다.";
                }

            } else {
                User findUser = userService.findByUserEmail(u.getEmail());
                MyRefriUserDetails findU = new MyRefriUserDetails(findUser);

                String jwtToken = tokenService.updateToken(token, findU);

                Authentication authentication = myRefriJwtTokenProvider.getAuthentication(findU);
                SecurityContextHolder.getContext().setAuthentication(authentication);

                response.setHeader("Authorization", "Bearer "+jwtToken);
                return "토큰이 정상적으로 발급되었습니다.";
            }
        } catch (HttpClientErrorException e){
            return "access token이 만료되었습니다.";
        } catch (Exception e){
            System.out.println(e.getMessage());
            return "알수없는 예외가 발생했습니다.";
        }
    }

}
