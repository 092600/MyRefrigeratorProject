package com.myrefrigerator.myrefrigerator.domain.user;

import com.myrefrigerator.myrefrigerator.domain.user.userRole.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long user_id;

    @Column
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String password;

    @Column
    private String gender;

    @Column
    private String age_range;

    @Column
    private String birthday;

    @Column
    private String profile_image;

    private int isSocial;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.USER;

    @Builder
    public User(String name, String email,
                String gender, String age_ragne, String birthday,
                String profile_image, int isSocial){
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.age_range = age_ragne;
        this.birthday = birthday;
        this.profile_image = profile_image;
        this.role = UserRole.USER;
        this.isSocial = isSocial;
    }



    public User hashPassword(PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(this.password);
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    public User update(String name, String picture){
        this.name = name;
        this.profile_image = profile_image;

        return this;
    }


}


