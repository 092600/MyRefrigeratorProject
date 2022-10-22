package com.myrefrigerator.myrefrigerator.config.domain.jwt;

import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetails;
import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@NoArgsConstructor
public class MyRefriJwtTokenProvider {
    @Autowired
    private MyRefriUserDetailsService myRefriUserDetailsService;
    private String secretKey = "myRefrigeratorJwtSecretKey2022ToyProject";
    private long tokenValidTime = 10 * 3600 * 12 * 30; // 1일

    public String createToken(MyRefriUserDetails user) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("name", user.getUser().getName());
        payloads.put("email", user.getUser().getEmail());

        String jwt = Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads) // 정보 저장
                .setSubject("MyRefri_JwtToken")
                .setExpiration(new Date(System.currentTimeMillis()+ + tokenValidTime)) // set Expire Time
                .signWith(getSignKey())  // 사용할 암호화 알고리즘과
                // signature 에 들어갈 secret값 세팅
                .compact();

        return jwt;
    }

    public Authentication getAuthentication(MyRefriUserDetails myRefriUserDetails) {
        return new UsernamePasswordAuthenticationToken(myRefriUserDetails, "", myRefriUserDetails.getAuthorities());
    }


    public String getUserEmailInJwtToken(String jwtToken){
        String email = Jwts.parser().setSigningKey(getSignKey()).parseClaimsJws(jwtToken).getBody().get("email", String.class);
        return email;
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(getSignKey()).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    private Key getSignKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }
}

