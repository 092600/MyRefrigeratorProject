package com.myrefrigerator.myrefrigerator.controllers;

import com.myrefrigerator.myrefrigerator.config.oauth2Config.oauth2Dto.SessionUser;
import com.myrefrigerator.myrefrigerator.domain.user.User;
import com.myrefrigerator.myrefrigerator.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Arrays;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v4/accounts")
public class AccountsApiController {
    private final UserService userService;
    private final HttpSession httpSession;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public boolean login(@RequestBody User user){
        if (userService.isExistUserEmail(user.getEmail())){
            User findUser = userService.findByUserEmail(user.getEmail());
            if (userService.stringMatcher(user, findUser)){
                httpSession.setAttribute("user", new SessionUser(findUser));
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


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
    public ArrayList<String> findEmail(@RequestBody User user,
                                       ArrayList<String> certifiationList){
        String email = user.getEmail();
        System.out.println(user.getName());

        if (userService.isExistUserEmail(email)) {
            User findUser = userService.findByUserEmail(email);
            if (findUser.getName().equals(user.getName())) {
                try {
                    int certificationNumber = userService.certificateUserForUserEmail(email);
                    certifiationList = new ArrayList<String>(
                            Arrays.asList(String.valueOf(userService.isExistUserEmail(email)), String.valueOf(certificationNumber)));
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.println(e.getMessage());

                    certifiationList = new ArrayList<String>(
                            Arrays.asList(String.valueOf(false), String.valueOf(0)));
                } finally {
                    return certifiationList;
                }
            } else {
                certifiationList = new ArrayList<String>(
                        Arrays.asList(String.valueOf(false), String.valueOf(0)));

                return certifiationList;
            }
        } else {
            certifiationList = new ArrayList<String>(
                    Arrays.asList(String.valueOf(false), String.valueOf(0)));
            return certifiationList;
        }
    }
    @RequestMapping(value = "/findPassword/checkEmail")
    public ArrayList<String> findPassword(@RequestBody User user,
                                       ArrayList<String> certifiationList){
        String email = user.getEmail();
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
    public boolean sendTempPassword(@RequestBody User findUser, User user, User tempUser){
        String email = findUser.getEmail();
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
