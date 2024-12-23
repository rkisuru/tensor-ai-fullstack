package com.rkisuru.tensorai.service;

import com.rkisuru.tensorai.model.Chat;
import com.rkisuru.tensorai.repository.ChatRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserInfoService userInfoService;

    public void saveChat(String question, String answer, @AuthenticationPrincipal OAuth2User user) {

        Chat chat = new Chat();
        chat.setQuestion(question);
        chat.setAnswer(answer);
        chat.setUserId(userInfoService.getUserId(user));
        chat.setCreatedTime(LocalDateTime.now());
        chatRepository.save(chat);
    }

    public void deleteChat(Integer id) {
        chatRepository.deleteById(id);
    }

    public Chat getChat(Integer id, @AuthenticationPrincipal OAuth2User user) {

        return chatRepository.findByUserId(userInfoService.getUserId(user), id)
                .orElseThrow(() -> new EntityNotFoundException("Chat not found"));
    }

    public List<Chat> getAllChats(@AuthenticationPrincipal OAuth2User user) {
        return chatRepository.findAllByUserId(userInfoService.getUserId(user));
    }
}
