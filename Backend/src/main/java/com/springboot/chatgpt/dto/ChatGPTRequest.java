package com.springboot.chatgpt.dto;

import java.util.List;

//chat gpt expects this two parameter
//model amd msg is mandatory
public record ChatGPTRequest(String model, List<Message> messages) {

    //record is spl type of class which hold inmutale data
    public static record Message(String role, String content){

    }
}
