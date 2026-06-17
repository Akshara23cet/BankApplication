package com.bank.model;

import java.sql.Timestamp;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Transaction {

    private int txnId;
    private int accountNo;
    private String type;
    private double amount;
    private double balance;
    
    @JsonProperty("txn_time")
    private Timestamp txnTime;

    public Transaction() {}

    public Transaction(int txnId, int accountNo, String type,
                       double amount, double balance, Timestamp txnTime) {
        this.txnId = txnId;
        this.accountNo = accountNo;
        this.type = type;
        this.amount = amount;
        this.balance = balance;
        this.txnTime = txnTime;
    }

    public int getTxnId() {
        return txnId;
    }

    public int getAccountNo() {
        return accountNo;
    }

    public String getType() {
        return type;
    }

    public double getAmount() {
        return amount;
    }

    public double getBalance() {
        return balance;
    }

    public Timestamp getTxnTime() {
        return txnTime;
    }

    public void setTxnId(int txnId) {
        this.txnId = txnId;
    }

    public void setAccountNo(int accountNo) {
        this.accountNo = accountNo;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void setTxnTime(Timestamp txnTime) {
        this.txnTime = txnTime;
    }
}
