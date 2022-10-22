package com.myrefrigerator.myrefrigerator.domain.token;

import com.myrefrigerator.myrefrigerator.config.domain.jwt.MyRefriJwtTokenProvider;
import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetails;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenRepository tokenRepository;
    private final UserService userService;
    private final MyRefriJwtTokenProvider myRefriJwtTokenProvider;

    public boolean existsByUserEmail(String userEmail){
        try {
            return tokenRepository.existsByUserEmail(userEmail);
        } catch (Exception e){
            return false;
        }
    }

    @Transactional
    public boolean saveToken(Token token){
        try {
            tokenRepository.save(token);
        } catch (Exception e){
            e.printStackTrace();
            return false;
        } finally {
            return true;
        }

    }


    @Transactional
    public String updateToken(Token token, MyRefriUserDetails u){
        try {
            Token t = tokenRepository.findTokenByUserEmail(u.getUser().getEmail());
            String jwtToken = myRefriJwtTokenProvider.createToken(u);
            System.out.println(jwtToken);
            t.update(token, jwtToken);
            tokenRepository.flush();

            return jwtToken;
        } catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }
}
