package com.myrefrigerator.myrefrigerator.config.securityConfig;

import com.myrefrigerator.myrefrigerator.config.oauth2Config.CustomOAuth2UserService;
import com.myrefrigerator.myrefrigerator.config.securityConfig.accountsSecurity.CustomLoginFailureHandler;
import com.myrefrigerator.myrefrigerator.config.securityConfig.accountsSecurity.CustomLoginSuccessHandler;
import com.myrefrigerator.myrefrigerator.domain.user.security.SecurityUserService;
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
    private final CustomOAuth2UserService customOAuth2UserService;
    private final SecurityUserService securityUserService;

    private final CustomLoginSuccessHandler customLoginSuccessHandler;

    private final CustomLoginFailureHandler customLoginFailureHandler;

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
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
                .antMatchers( "/css/**", "/images/**", "/js/**", "/jq/**").permitAll()
                // accounts
                .antMatchers("/accounts/**").permitAll()
                // accounts ajax
                .antMatchers("/api/v4/accounts/**").permitAll()
                .antMatchers("/api/v4/accounts/signup/checkEmail").permitAll()
                .antMatchers("/api/v4/accounts/findPassword/sendTempPassword").permitAll()


                .antMatchers("/").access("hasRole('ADMIN') or hasRole('USER')")

                .anyRequest().authenticated()
            //
            .and()
                .logout()
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
            // .and()
                // .formLogin()
                // .loginPage("/accounts/login")
                // .usernameParameter("email")
                // .passwordParameter("password")
                // .loginProcessingUrl("/api/v4/accounts/login")
                // .successHandler(customLoginSuccessHandler)
                // .failureHandler(customLoginFailureHandler)
                // .defaultSuccessUrl("http://localhost:3000/", true)
            .and()
                .oauth2Login()
                .loginPage("/accounts/login")
                .defaultSuccessUrl("/")
                .failureUrl("/")
                .userInfoEndpoint()
                .userService(customOAuth2UserService);
    }

    public void configure(WebSecurity web) throws Exception {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .antMatchers("/favicon.ico", "/resources/**", "/error",
                        "/templates/**", "/js/**", "/jq/**");
    }


}
