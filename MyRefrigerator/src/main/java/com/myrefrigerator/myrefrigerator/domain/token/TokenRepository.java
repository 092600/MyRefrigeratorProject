package com.myrefrigerator.myrefrigerator.domain.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface TokenRepository extends JpaRepository<Token, Long> {
    public Token findTokenByUserEmail(String userEmail);
    public boolean existsByUserEmail(String userEmail);

//    @Modifying(clearAutomatically = true)
//    @Query("UPDATE User u SET u.password = :password where u.email = :email")
//    void updateUserPassword(@Param(value="password") String password, @Param(value = "email") String email);
}
