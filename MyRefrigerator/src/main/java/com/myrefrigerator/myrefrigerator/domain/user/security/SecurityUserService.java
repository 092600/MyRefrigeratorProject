package com.myrefrigerator.myrefrigerator.domain.user.security;

import com.myrefrigerator.myrefrigerator.config.oauth2Config.oauth2Dto.SessionUser;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
public class SecurityUserService implements UserDetailsService {
    private final UserService userService;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final HttpSession httpSession;

    // 어디로 리턴되는가 .. > 시큐리티 session(내부 Authentication(내부 UserDetails))
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.findByUserEmail(email);
        if (user != null){
            httpSession.setAttribute("user", new SessionUser(user));
            return new SecurityUser(user);
        }
        return null;
    }
}

