package model;

import java.sql.Timestamp;

public class Transaction {

    private int txnId;
    private int accountNo;
    private String type;
    private double amount;
    private double balance;
    private Timestamp txnTime;

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
}
