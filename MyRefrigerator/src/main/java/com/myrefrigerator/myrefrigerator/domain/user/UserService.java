package com.myrefrigerator.myrefrigerator.domain.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JavaMailSender mailSender;
    private SimpleMailMessage message = new SimpleMailMessage();

    @Value("${spring.mail.username}")
    private String sender;


    @Transactional
    public boolean isExistUserEmail(String email){
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public boolean signUp(User user){
        user = encodingPassword(user);
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());

            return false;
        }
    }

    @Transactional
    public User findByUserEmail(String email){
        if (userRepository.existsByEmail(email)){
            return userRepository.findUserByEmail(email);
        } else {
            return null;
        }
    }

    @Transactional
    public User encodingPassword(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return user;
    }
    @Transactional
    public boolean stringMatcher(User checkUser, User findUser){
        findUser = userRepository.findUserByEmail(checkUser.getEmail());
        if (passwordEncoder.matches(checkUser.getPassword(), findUser.getPassword())){
            return true;
        } else {
            return false;
        }
    }

    public boolean updateUser(User user){
        try {
            userRepository.save(user);
        } catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return false;
        } finally {
            return true;
        }
    }

    public int randomNumber(){
        Random random = new Random();
        int randomNumber = random.nextInt(999999 - 100000 + 1) + 100000;
        return randomNumber;
    }
    @Transactional
    public int certificateUserForUserEmail(String email){
        int randomNumber = randomNumber();

        message.setTo(email);
        message.setFrom(sender);
        message.setSubject("나의 냉장고 아이디 찾기 인증번호 발급");
        message.setText("안녕하세요. 나의 냉장고에서 아이디 찾기를 위한 인증번호를 발급해드렸습니다.\n" +
                "회원님의 아이디 찾기를 위한 인증번호는 "+randomNumber +"입니다.\n" +
                "해당 페이지에서 인증번호를 입력하고 아이디를 찾아주세요 !");
        mailSender.send(message);

        return randomNumber;
    }

    @Transactional
    public int certificateUserForUserPassword(String email){
        int randomNumber = randomNumber();

        message.setTo(email);
        message.setFrom(sender);
        message.setSubject("나의 냉장고 비밀번호 찾기 인증번호 발급");
        message.setText("안녕하세요. 나의 냉장고에서 비밀번호 찾기를 위한 인증번호를 발급해드렸습니다.\n" +
                "회원님의 비밀번호 찾기를 위한 인증번호는 "+randomNumber +"입니다.\n" +
                "해당 페이지에서 인증번호를 입력해주세요");
        mailSender.send(message);

        return randomNumber;
    }


    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    @Transactional
    public String sendTempPasswordToUser(User user){
        String tempPassword = getTempPassword();
        try {
            message.setTo(user.getEmail());
            message.setFrom(sender);
            message.setSubject("나의 냉장고 임시비밀번호 발급 메일");
            message.setText("안녕하세요 "+user.getName()+"님\n" +
                    "회원님의 임시비밀번호 발급을 위한 인증번호는 "+ tempPassword +"입니다.");
            mailSender.send(message);
        } catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());

            System.out.println("error");
        } finally {
            return tempPassword;
        }
    }
}
