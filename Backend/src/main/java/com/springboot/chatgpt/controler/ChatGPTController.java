package com.springboot.chatgpt.controller;

import com.springboot.chatgpt.dto.PromptRequest;
import com.springboot.chatgpt.service.ChatGPTService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//to allow port
@CrossOrigin("*")
@RestController
@RequestMapping("api/chat")
public class ChatGPTController {

    //creating rest endpoints
    private  final ChatGPTService chatGPTService;

    public  ChatGPTController(ChatGPTService chatGPTService){
        this.chatGPTService = chatGPTService;
    }

    //making as rest api
    @PostMapping
//    public String chat(@RequestBody PromptRequest promptRequest){
//        return  chatGPTService.getChatResponse(promptRequest);

    public Map<String, String> chat(@RequestBody PromptRequest promptRequest){
        String response = chatGPTService.getChatResponse(promptRequest);
        return Map.of("text", response); // 👈 wrap response in JSON format
    }
}
