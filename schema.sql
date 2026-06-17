-- MySQL Schema for Online Banking System

-- Create Database
CREATE DATABASE IF NOT EXISTS bankdb;
USE bankdb;

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    account_no INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    pin INT NOT NULL,
    balance DOUBLE DEFAULT 0.0
);

-- Set auto-increment to start at 1001 for professional-looking account numbers
ALTER TABLE users AUTO_INCREMENT = 1001;

-- 2. Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    txn_id INT AUTO_INCREMENT PRIMARY KEY,
    account_no INT NOT NULL,
    type VARCHAR(20) NOT NULL,
    amount DOUBLE NOT NULL,
    balance DOUBLE NOT NULL,
    txn_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_no) REFERENCES users(account_no) ON DELETE CASCADE
);
