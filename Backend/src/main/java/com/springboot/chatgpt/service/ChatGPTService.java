package com.springboot.chatgpt.service;


import com.springboot.chatgpt.dto.ChatGPTRequest;
import com.springboot.chatgpt.dto.ChatGPTResponse;
import com.springboot.chatgpt.dto.PromptRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class ChatGPTService  {

    private final RestClient restClient;

    public ChatGPTService(RestClient restClient){
        this.restClient = restClient;
    }

    //fetching value from application.properties
    @Value("${openapi.api.key}")
    private String apiKey;

    @Value("${openapi.api.model}")
    private String model;

//    public String getChatResponse(PromptRequest promptRequest){
//
//        ChatGPTRequest chatGPTRequest = new ChatGPTRequest(
//                model,
//                List.of(new ChatGPTRequest.Message("user",promptRequest.prompt()))
//        );
//
//        ChatGPTResponse response = restClient.post()
//                .header("Authorization","Bearer " + apiKey)
//                .header("Content-Type","application/json")
//                .body(chatGPTRequest)
//                .retrieve()
//                .body(ChatGPTResponse.class);
//
//        return response.choices().get(0).message().content();
//    }

    public String getChatResponse(PromptRequest promptRequest){

        ChatGPTRequest chatGPTRequest = new ChatGPTRequest(
                model,
                List.of(new ChatGPTRequest.Message("user", promptRequest.prompt()))
        );

        ChatGPTResponse response = restClient.post()
                .header("Authorization","Bearer " + apiKey)
                .header("Content-Type","application/json")
                .body(chatGPTRequest)
                .retrieve()
                .body(ChatGPTResponse.class);

        // Return as-is (keep Markdown formatting)
        return response.choices().get(0).message().content();
    }

}
