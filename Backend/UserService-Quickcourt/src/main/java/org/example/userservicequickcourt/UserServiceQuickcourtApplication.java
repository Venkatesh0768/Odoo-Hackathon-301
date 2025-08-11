package org.example.userservicequickcourt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EntityScan(basePackages = "org.example.entityservicequickcourt.models")
public class UserServiceQuickcourtApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceQuickcourtApplication.class, args);
    }

}
