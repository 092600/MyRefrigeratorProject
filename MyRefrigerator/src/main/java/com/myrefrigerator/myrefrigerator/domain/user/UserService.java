package com.myrefrigerator.myrefrigerator.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public User getUser(String userName){
        (User) userRepository.findByName(userName);
    }
}
