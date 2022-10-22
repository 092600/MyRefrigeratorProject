package com.myrefrigerator.myrefrigerator.domain.restTemplate;


import com.myrefrigerator.myrefrigerator.domain.token.Token;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.social.GoogleUser;
import com.myrefrigerator.myrefrigerator.domain.user.social.NaverUser;
import com.nimbusds.jose.shaded.json.JSONObject;
import com.nimbusds.jose.shaded.json.parser.JSONParser;
import com.nimbusds.jose.shaded.json.parser.ParseException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.util.Map;


@RequiredArgsConstructor
@Component
public class TokenRestTemplate {
    private final String naverUri = "https://openapi.naver.com/v1/nid/me";
    private final String googleUri = "https://www.googleapis.com/oauth2/v2/userinfo";


    private final NaverUser naverUser;
    private final GoogleUser googleUser;

    public User getNaverUser(Token token) throws URISyntaxException, ParseException, HttpClientErrorException {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", "Bearer "+token.getAccess_token());

        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        URI uri = new URI(naverUri);
        try{
            ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK){
                JSONParser jsonParser = new JSONParser();
                JSONObject userInfo = (JSONObject) jsonParser.parse(response.getBody().toString());

                Map<String, String> res = (Map<String, String>)(userInfo.get("response"));
                User user = naverUser.getUser(res);

                return user;
            } else if(response.getStatusCode() == HttpStatus.UNAUTHORIZED){
                return null;
            } else {
                return null;
            }
        } catch (HttpClientErrorException e){
            System.out.println(e.getMessage());
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
        }

    }

    public User getGoogleUser(Token token) throws URISyntaxException, ParseException, HttpClientErrorException {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", "Bearer "+token.getAccess_token());

        HttpEntity<String> entity = new HttpEntity<>(null, headers);
        try{
            ResponseEntity<String> response = restTemplate.exchange(googleUri, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode().equals(HttpStatus.OK)){
                JSONParser jsonParser = new JSONParser();
                JSONObject userInfo = (JSONObject) jsonParser.parse(response.getBody());

                User user = googleUser.getUser(userInfo);

                return user;
            } else if(response.getStatusCode() == HttpStatus.UNAUTHORIZED){
                return null;
            } else {
                return null;
            }
        } catch (HttpClientErrorException e){
            System.out.println(e.getMessage());
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
        }

    }

}
