package com.myrefrigerator.myrefrigerator.config;

import com.myrefrigerator.myrefrigerator.config.domain.jwt.MyRefriJwtTokenProvider;
import com.myrefrigerator.myrefrigerator.config.domain.user.MyRefriUserDetailsService;
import com.myrefrigerator.myrefrigerator.config.filter.authentication.MyRefriJwtAuthenticationFilter;
import com.myrefrigerator.myrefrigerator.config.filter.authentication.MyRefriJwtAuthorizationFilter;
import com.myrefrigerator.myrefrigerator.config.handler.authentication.MyRefriAuthenticationFailureHandler;
import com.myrefrigerator.myrefrigerator.config.manager.authentication.MyRefriAuthenticationManager;
import com.myrefrigerator.myrefrigerator.domain.token.TokenService;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final MyRefriAuthenticationFailureHandler myRefriAuthenticationFailureHandler;
    private final CorsFilter corsFilter;
    private final MyRefriJwtTokenProvider myRefriJwtTokenProvider;
    private final MyRefriAuthenticationManager myRefriAuthenticationManager;
    private final UserService userService;
    private final TokenService tokenService;
    private final MyRefriUserDetailsService myRefriUserDetailsService;
    private final PasswordEncoder passwordEncoder;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .formLogin().disable()
            .httpBasic().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilter(corsFilter)
                .addFilter(new MyRefriJwtAuthenticationFilter(myRefriAuthenticationManager, myRefriJwtTokenProvider, userService, tokenService))
                .addFilter(new MyRefriJwtAuthorizationFilter(myRefriAuthenticationManager, myRefriJwtTokenProvider, userService));

        http
            .authorizeRequests()
            .mvcMatchers( "/css/**", "/images/**", "/js/**", "/jq/**").permitAll()
            // accounts
            .mvcMatchers("/accounts/**").permitAll()
            // accounts ajax
            .mvcMatchers("/api/v4/accounts/**").permitAll()
            .mvcMatchers("/api/v4/accounts/signup").permitAll()
            .mvcMatchers("/api/v4/accounts/signup/checkEmail").permitAll()
            .mvcMatchers("/api/v4/accounts/findPassword/sendTempPassword").permitAll()
            .mvcMatchers("/login/oauth/naver").permitAll()
            .mvcMatchers("/login/oauth/google/token").permitAll()
            .mvcMatchers("/login/oauth/naver/token").permitAll()
            .mvcMatchers("/user").hasRole("USER")
            .mvcMatchers("/admin").hasRole("ADMIN")
            .mvcMatchers("/accounts/login").permitAll()
            .anyRequest().authenticated()
        //
        .and()
            .oauth2Login();
    }

    public void configure(WebSecurity web) throws Exception {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations())
                .antMatchers("/favicon.ico", "/resources/**", "/error",
                        "/templates/**", "/js/**", "/jq/**");
    }

//    @Bean(name = "mvcHandlerMappingIntrospector")
//    public HandlerMappingIntrospector mvcHandlerMappingIntrospector() {
//        return new HandlerMappingIntrospector();
//    }

}
