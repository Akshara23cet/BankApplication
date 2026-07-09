package com.bank.service;

import java.util.List;
import com.bank.dao.UserDAO;
import com.bank.dao.TransactionDAO;
import com.bank.model.User;
import com.bank.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BankService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TransactionDAO transactionDAO;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ---------------- CREATE ACCOUNT ----------------
    public String createAccount(String name, String pin) {
        if (pin == null || pin.trim().isEmpty() || !pin.matches("\\d+")) {
            return "Invalid PIN. Must be a numeric value.";
        }
        if (name == null || name.trim().isEmpty()) {
            return "Invalid name. Name cannot be empty.";
        }

        String hashedPin = passwordEncoder.encode(pin);
        User user = new User(0, name, hashedPin, 0.0);
        int accNo = userDAO.createUser(user);

        if (accNo != -1) {
            return "Account created successfully! Your Account Number is: " + accNo;
        } else {
            return "Failed to create account. Please try again.";
        }
    }

    // ---------------- LOGIN ----------------
    public User login(int accNo, String pin) {
        User user = userDAO.getUserByAccount(accNo);
        if (user != null && passwordEncoder.matches(pin, user.getPin())) {
            return user;
        }
        return null;
    }

    // ---------------- DEPOSIT ----------------
    public synchronized String deposit(int accNo, String pin, double amount) {
        User user = userDAO.getUserByAccount(accNo);
        if (user == null || !passwordEncoder.matches(pin, user.getPin())) {
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
    public synchronized String withdraw(int accNo, String pin, double amount) {
        User user = userDAO.getUserByAccount(accNo);
        if (user == null || !passwordEncoder.matches(pin, user.getPin())) {
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
    @Transactional
    public synchronized String transfer(int fromAcc, String pin, int toAcc, double amount) {
        if (amount <= 0) {
            return "Invalid transfer amount";
        }
        if (fromAcc == toAcc) {
            return "Cannot transfer to the same account";
        }

        User sender = userDAO.getUserByAccount(fromAcc);
        if (sender == null || !passwordEncoder.matches(pin, sender.getPin())) {
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
    public String changePin(int accNo, String oldPin, String newPin) {
        User user = userDAO.getUserByAccount(accNo);
        if (user == null || !passwordEncoder.matches(oldPin, user.getPin())) {
            return "Invalid account number or PIN";
        }
        if (newPin == null || newPin.trim().isEmpty() || !newPin.matches("\\d+")) {
            return "Invalid new PIN";
        }
        if (oldPin.equals(newPin)) {
            return "New PIN must be different from the old PIN";
        }

        String hashedNewPin = passwordEncoder.encode(newPin);
        userDAO.updatePin(user.getAccountNo(), hashedNewPin);
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
















