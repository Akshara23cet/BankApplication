package com.bank.model;

public class User {
    private int accountNo;
    private String name;
    private String pin;
    private double balance;

    public User() {}

    public User(int accountNo, String name, String pin, double balance) {
        this.accountNo = accountNo;
        this.name = name;
        this.pin = pin;
        this.balance = balance;
    }

    public int getAccountNo() {
        return accountNo;
    }

    public String getName() {
        return name;
    }

    public String getPin() {
        return pin;
    }

    public double getBalance() {
        return balance;
    }

    public void setAccountNo(int accountNo) {
        this.accountNo = accountNo;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}

