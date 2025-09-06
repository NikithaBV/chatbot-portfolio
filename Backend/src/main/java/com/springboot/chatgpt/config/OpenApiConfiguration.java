package com.springboot.chatgpt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class OpenApiConfiguration {

    //we are using @value annotation to access url from application.properties
    @Value("${openapi.api.url}")
    private String apiUrl;


    //to make restclient as spring bean
    @Bean
    public RestClient restClient(){
        return RestClient.builder().baseUrl(apiUrl).build();
    }
}
