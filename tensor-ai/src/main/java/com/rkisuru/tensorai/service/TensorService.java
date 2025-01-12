package com.rkisuru.tensorai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class TensorService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public TensorService(WebClient.Builder webClient, ObjectMapper objectMapper) {
        this.webClient = webClient.build();
        this.objectMapper = objectMapper;
    }

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;


    public String getResponse(String question) {

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of(
                                "parts", new Object[] {
                                        Map.of(
                                                "text", question
                                        )
                                }
                        )
                }
        );

        return webClient.post()
                .uri(geminiApiUrl+geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public Mono<String> extractText(String jsonResponse) {
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode textNode = rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");
            return Mono.just(textNode.asText());
        } catch (Exception e) {
            return Mono.error(new RuntimeException("Failed to extract text", e));
        }
    }
}
