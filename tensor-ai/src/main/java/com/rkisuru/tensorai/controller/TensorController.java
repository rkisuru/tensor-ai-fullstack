package com.rkisuru.tensorai.controller;

import com.rkisuru.tensorai.service.TensorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/tensor")
@RequiredArgsConstructor
public class TensorController {

    private final TensorService tensorService;

    @PostMapping("/ask")
    public ResponseEntity<String> queryTensor(@RequestBody Map<String, String> request) {

        String question = request.get("question");
        String answer = tensorService.getResponse(question);
        return ResponseEntity.ok(answer);
    }
}
