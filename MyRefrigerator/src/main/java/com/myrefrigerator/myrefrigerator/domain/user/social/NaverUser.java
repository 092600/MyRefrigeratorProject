package com.myrefrigerator.myrefrigerator.domain.user.social;

import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.userRole.UserRole;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Map;

@Getter
@Setter
@Component
public class NaverUser {
    private String id;
    private String name;
    private String email;
    private String gender;
    private String age_range;
    private String profile_image;
    private int isSocial = 1;

    public User getUser(Map<String, String> jsonObject){
        User user = new User();

        user.setId(jsonObject.get("id"));
        user.setName(jsonObject.get("name"));
        user.setEmail(jsonObject.get("email"));
        user.setGender(jsonObject.get("gender"));
        user.setAge_range(jsonObject.get("age"));
        user.setProfile_image(jsonObject.get("profile_image"));
        user.setIsSocial(1);
        user.setRole(UserRole.USER);

        return user;
    }



}
