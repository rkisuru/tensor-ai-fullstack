package com.rkisuru.tensorai.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserInfoService {

    public Map<String, Object> getAttributes(@AuthenticationPrincipal OAuth2User user) {
        return user.getAttributes();
    }

    public String getUserId(OAuth2User user) {
        return getAttributes(user).get("sub").toString();
    }

    public Boolean checkAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getPrincipal() instanceof OAuth2User;
        }
        return false;
    }
}
