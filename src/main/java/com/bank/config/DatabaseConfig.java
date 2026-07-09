package com.bank.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DatabaseConfig {

    @Bean
    public CommandLineRunner migrateSchema(JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                jdbcTemplate.execute("ALTER TABLE users MODIFY COLUMN pin VARCHAR(255) NOT NULL;");
                System.out.println("Schema migration: pin column updated to VARCHAR(255) successfully.");
            } catch (Exception e) {
                System.out.println("Schema migration skipped: " + e.getMessage());
            }
        };
    }
}