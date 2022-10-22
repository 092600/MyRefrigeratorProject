package com.myrefrigerator.myrefrigerator.domain.user.social;

import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.userRole.UserRole;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.Map;

@Getter
@Setter
@Component
public class GoogleUser {
    private String id;
    private String name;
    private String email;
    private String picture;
    private int isSocial;

    public User getUser(JSONObject jsonObject){
        User user = new User();

        user.setId((String) jsonObject.get("id"));
        user.setName((String) jsonObject.get("name"));
        user.setEmail((String) jsonObject.get("email"));
        user.setProfile_image((String) jsonObject.get("picture"));
        user.setIsSocial(3);
        user.setRole(UserRole.USER);

        return user;
    }


}
