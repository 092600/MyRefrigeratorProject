package com.myrefrigerator.myrefrigerator.config.auth;

import com.myrefrigerator.myrefrigerator.domain.user.userRole.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//    private final UserService userService;
    private final CustomOAuth2UserService customOAuth2UserService;
    /**
     * 규칙 설정
     * @param http
     * @throws Exception
     */
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf()
//                    .disable()		//로그인 창
//                .authorizeRequests()
//                    .antMatchers("/accunts")
//                        .authenticated()
//                    .antMatchers("/api/v1/**")
//                        .hasRole(UserRole.USER.name())
//                    .anyRequest()
//                        .permitAll()
//                .and()
//                    .logout()
//                        .logoutSuccessUrl("/")
//                .and()
//                    .oauth2Login()
//                        .userInfoEndpoint()
//                            .userService(customOAuth2UserService);
//    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                    .disable()
                .headers()
                    .frameOptions()
                        .disable()
                .and()
                    .authorizeRequests()
                    .antMatchers("/", "css/**", "/images/**", "/js/**").permitAll()
                    .antMatchers("/api/v1/**").hasRole(UserRole.USER.name())
                    .antMatchers("/mypage").permitAll()
                    .antMatchers("/accounts/login").permitAll()
                    .anyRequest().authenticated()
                .and()
                    .logout()
                        .logoutSuccessUrl("/")
                .and()
                    .oauth2Login()
                    .loginPage("/accounts/login")
                .and()
                    .oauth2Login()
                        .defaultSuccessUrl("/")
                        .failureUrl("/accounts/login")
                        .userInfoEndpoint()
                        .userService(customOAuth2UserService);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .antMatchers("/favicon.ico", "/resources/**", "/error");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}