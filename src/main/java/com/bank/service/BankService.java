package com.bank.service;

import java.util.List;
import com.bank.dao.UserDAO;
import com.bank.dao.TransactionDAO;
import com.bank.model.User;
import com.bank.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TransactionDAO transactionDAO;

    // ---------------- CREATE ACCOUNT ----------------
    public String createAccount(String name, int pin) {
        if (pin <= 0) {
            return "Invalid PIN. Must be greater than 0.";
        }
        if (name == null || name.trim().isEmpty()) {
            return "Invalid name. Name cannot be empty.";
        }

        User user = new User(0, name, pin, 0.0);
        int accNo = userDAO.createUser(user);

        if (accNo != -1) {
            return "Account created successfully! Your Account Number is: " + accNo;
        } else {
            return "Failed to create account. Please try again.";
        }
    }

    // ---------------- LOGIN ----------------
    public User login(int accNo, int pin) {
        return userDAO.getUserByAccountAndPin(accNo, pin);
    }

    // ---------------- DEPOSIT ----------------
    public String deposit(int accNo, int pin, double amount) {
        User user = userDAO.getUserByAccountAndPin(accNo, pin);
        if (user == null) {
            return "Invalid account number or PIN";
        }

        if (amount <= 0) {
            return "Invalid deposit amount";
        }

        double newBalance = user.getBalance() + amount;
        userDAO.updateBalance(user.getAccountNo(), newBalance);

        transactionDAO.insertTransaction(
                user.getAccountNo(),
                "DEPOSIT",
                amount,
                newBalance
        );

        return "Deposit successful. New Balance: " + newBalance;
    }

    // ---------------- WITHDRAW ----------------
    public String withdraw(int accNo, int pin, double amount) {
        User user = userDAO.getUserByAccountAndPin(accNo, pin);
        if (user == null) {
            return "Invalid account number or PIN";
        }

        if (amount <= 0) {
            return "Invalid withdraw amount";
        }

        if (amount > user.getBalance()) {
            return "Insufficient balance";
        }

        double newBalance = user.getBalance() - amount;
        userDAO.updateBalance(user.getAccountNo(), newBalance);

        transactionDAO.insertTransaction(
                user.getAccountNo(),
                "WITHDRAW",
                amount,
                newBalance
        );

        return "Withdraw successful. New Balance: " + newBalance;
    }

    // ---------------- TRANSFER ----------------
    public String transfer(int fromAcc, int pin, int toAcc, double amount) {
        if (amount <= 0) {
            return "Invalid transfer amount";
        }
        if (fromAcc == toAcc) {
            return "Cannot transfer to the same account";
        }

        User sender = userDAO.getUserByAccountAndPin(fromAcc, pin);
        if (sender == null) {
            return "Invalid account number or PIN";
        }

        User receiver = userDAO.getUserByAccount(toAcc);
        if (receiver == null) {
            return "Receiver account not found";
        }

        if (sender.getBalance() < amount) {
            return "Insufficient balance";
        }

        double senderNewBalance = sender.getBalance() - amount;
        double receiverNewBalance = receiver.getBalance() + amount;

        userDAO.updateBalance(fromAcc, senderNewBalance);
        userDAO.updateBalance(toAcc, receiverNewBalance);

        transactionDAO.insertTransaction(fromAcc, "TRANSFER_OUT", amount, senderNewBalance);
        transactionDAO.insertTransaction(toAcc, "TRANSFER_IN", amount, receiverNewBalance);

        return "Transfer successful. New Balance: " + senderNewBalance;
    }

    // ---------------- VIEW TRANSACTION HISTORY ----------------
    public List<Transaction> getTransactionHistory(int accountNo) {
        return transactionDAO.getTransactionsByAccount(accountNo);
    }

    // ---------------- CHANGE PIN ----------------
    public String changePin(int accNo, int oldPin, int newPin) {
        User user = userDAO.getUserByAccountAndPin(accNo, oldPin);
        if (user == null) {
            return "Invalid account number or PIN";
        }
        if (newPin <= 0 || newPin == oldPin) {
            return "Invalid new PIN";
        }

        userDAO.updatePin(user.getAccountNo(), newPin);
        return "PIN changed successfully!";
    }
    // ---------------- GET BALANCE ----------------
    public String getBalance(int accNo) {
        User user = userDAO.getUserByAccount(accNo);
        if (user == null) {
            return "Account not found";
        }
        return "Current Balance: " + user.getBalance();
    }
}