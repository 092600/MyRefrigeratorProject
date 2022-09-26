package com.myrefrigerator.myrefrigerator.controllers;

import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Arrays;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/accounts")
public class AccountsController {
    private final UserService userService;
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public boolean signUp(@RequestBody User user){
        if (userService.isExistUserEmail(user.getEmail())){
            return false;
        } else {
            return userService.signUp(user);
        }
    }

    @RequestMapping(value = "/signup/checkEmail")
    public boolean checkEmail(@RequestParam("email") String email){
        return userService.isExistUserEmail(email);
    }

    @RequestMapping(value = "/myinfo/certificationPassword", method = RequestMethod.POST)
    public boolean certificationPassword(@RequestBody User checkUser, User user){
        user = userService.findByUserEmail(checkUser.getEmail());

        if (userService.stringMatcher(checkUser, user)){
            return true;
        } else {
            return false;
        }
    }

    @RequestMapping(value = "/myinfo/changingPassword", method = RequestMethod.POST)
    public boolean changingPassword(@RequestBody User checkUser, User user){
        user = userService.findByUserEmail(checkUser.getEmail());
        checkUser = userService.encodingPassword(checkUser);
        user.setPassword(checkUser.getPassword());

        return userService.updateUser(user);
    }

    @RequestMapping(value = "/findEmail/checkEmail")
    public ArrayList<String> findEmail(@RequestParam("email") String email,
                                       ArrayList<String> certifiationList){
        if (userService.isExistUserEmail(email)){
            try {
                int certificationNumber = userService.certificateUserForUserEmail(email);
                certifiationList = new ArrayList<String>(
                        Arrays.asList(String.valueOf(userService.isExistUserEmail(email)), String.valueOf(certificationNumber)));
            } catch (Exception e){
                e.printStackTrace();
                System.out.println(e.getMessage());

                certifiationList = new ArrayList<String>(
                        Arrays.asList(String.valueOf(false), String.valueOf(0)));
            } finally {
                return certifiationList;
            }
        } else {
            return certifiationList;
        }
    }
    @RequestMapping(value = "/findPassword/checkEmail")
    public ArrayList<String> findPassword(@RequestParam("email") String email,
                                          ArrayList<String> certifiationList){
        if (userService.isExistUserEmail(email)){
            try {
                int certificationNumber = userService.certificateUserForUserPassword(email);
                certifiationList = new ArrayList<String>(
                        Arrays.asList(String.valueOf(userService.isExistUserEmail(email)), String.valueOf(certificationNumber)));
            } catch (Exception e){
                e.printStackTrace();
                System.out.println(e.getMessage());

                certifiationList = new ArrayList<String>(
                        Arrays.asList(String.valueOf(false), String.valueOf(0)));
            } finally {
                return certifiationList;
            }
        } else {
            return certifiationList;
        }
    }

    @RequestMapping(value = "/findPassword/sendTempPassword")
    public boolean sendTempPassword(@RequestParam("email") String email, User user, User tempUser){
        user = userService.findByUserEmail(email);
        boolean result = false;
        try {
            String tempPassword = userService.sendTempPasswordToUser(user);
            tempUser.setEmail(user.getEmail()); tempUser.setPassword(tempPassword);
            tempUser = userService.encodingPassword(tempUser);
            user.setPassword(tempUser.getPassword());
            result = userService.updateUser(user);
        } catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return false;
        } finally {
            return result;
        }
    }

}
