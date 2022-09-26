package com.myrefrigerator.myrefrigerator.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findUserByEmail(String email);
    Optional<User> findByName(String name);
    User findUserByEmailAndName(String userEmail, String userName);
    boolean existsByEmail(String email);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE User u SET u.password = :password where u.email = :email")
    void updateUserPassword(@Param(value="password") String password, @Param(value = "email") String email);

}
