package com.bank.utils;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;

public class DBConnection {

    private static HikariDataSource dataSource;

    static {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost:3306/bankdb");
        config.setUsername("root");
        config.setPassword("root");
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setIdleTimeout(30000);
        config.setConnectionTimeout(20000);
        dataSource = new HikariDataSource(config);
    }

    public static Connection getConnection() {
        try {
            return dataSource.getConnection();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}