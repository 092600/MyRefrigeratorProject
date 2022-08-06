package com.myrefrigerator.myrefrigerator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MyRefrigeratorApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyRefrigeratorApplication.class, args);
    }

}
