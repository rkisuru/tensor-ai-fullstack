package com.rkisuru.tensorai.controller;

import com.rkisuru.tensorai.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserInfoService userInfoService;

    @GetMapping("/image")
    public ResponseEntity<String> getUserImage(@AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok(userInfoService.getAttributes(user).get("picture").toString());
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getUserInfo(@AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok(userInfoService.getAttributes(user));
    }
}
