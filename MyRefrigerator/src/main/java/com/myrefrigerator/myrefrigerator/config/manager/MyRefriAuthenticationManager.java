package com.myrefrigerator.myrefrigerator.config.manager;

import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class MyRefriAuthenticationManager implements AuthenticationManager {
    @Autowired
    private MyRefriUserDetailsService myRefriUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException, UsernameNotFoundException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();


        UserDetails u = myRefriUserDetailsService.loadUserByUsername(username);
        if (u == null){
            throw new BadCredentialsException("error");
        }

        if (passwordEncoder.matches(password, u.getPassword())) {
            return new UsernamePasswordAuthenticationToken(
                    username,
                    password,
                    u.getAuthorities()
            );
        } else {
            throw new BadCredentialsException("error");
        }


    }

}
