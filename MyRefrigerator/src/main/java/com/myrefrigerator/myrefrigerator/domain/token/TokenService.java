package com.myrefrigerator.myrefrigerator.domain.token;

import com.myrefrigerator.myrefrigerator.config.domain.jwt.MyRefriJwtTokenProvider;
import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetails;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenRepository tokenRepository;
    private final UserService userService;
    private final MyRefriJwtTokenProvider myRefriJwtTokenProvider;

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

    public String updateToken(Token token, MyRefriUserDetails u){
        Token t = tokenRepository.findTokenByUserEmail(u.getUser().getEmail());

        String jwtToken = myRefriJwtTokenProvider.createToken(u);
        t.update(token, jwtToken);

        tokenRepository.flush();

        return jwtToken;
    }
}
