package com.springboot.chatgpt.dto;

import java.util.List;

//as we saw in postman inside choices ther is msg then role & content
public record ChatGPTResponse(List<Choice> choices) {

    public static record Choice(Message message){

        public static record Message(String role, String content){

        }
    }
}
