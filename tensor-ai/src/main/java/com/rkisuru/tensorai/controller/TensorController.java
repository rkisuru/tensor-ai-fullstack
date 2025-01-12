package com.rkisuru.tensorai.controller;

import com.rkisuru.tensorai.model.Chat;
import com.rkisuru.tensorai.service.ChatService;
import com.rkisuru.tensorai.service.TensorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/tensor")
@RequiredArgsConstructor
public class TensorController {

    private final TensorService tensorService;
    private final ChatService chatService;

    @PostMapping("/ask")
    public ResponseEntity<String> queryTensor(@RequestBody Map<String, String> request, @AuthenticationPrincipal OAuth2User user) {

        String question = request.get("question");
        String answer = tensorService.getResponse(question);
        String extractedAnswer = tensorService.extractText(answer).block();

        chatService.saveChat(question, extractedAnswer, user);
        return ResponseEntity.ok(answer);
    }

    @GetMapping("/chats")
    public ResponseEntity<List<Chat>> getAllChats(@AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok(chatService.getAllChats(user));
    }

    @DeleteMapping("/chats")
    public ResponseEntity<String> deleteChat(@RequestParam Integer id) {
        chatService.deleteChat(id);
        return ResponseEntity.ok("Chat deleted successfully");
    }

    @GetMapping("/chats/{id}")
    public ResponseEntity<Chat> getChat(@PathVariable Integer id, @AuthenticationPrincipal OAuth2User user) {
        return ResponseEntity.ok(chatService.getChat(id, user));
    }
}
