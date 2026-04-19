package service;

import dao.UserDAO;
import dao.TransactionDAO;
import model.User;
import model.Transaction;

import java.util.List;
import java.util.Scanner;


public class BankService {

    private UserDAO userDAO = new UserDAO();
    private TransactionDAO transactionDAO = new TransactionDAO();

    // ---------------- CREATE ACCOUNT ----------------
    public void createAccount(String name, int pin) {

        if (pin <= 0) {
            System.out.println("Invalid PIN");
            return;
        }

        User user = new User(0, name, pin, 0.0);
        userDAO.createUser(user);

        System.out.println("Account created successfully!");
    }

    // ---------------- LOGIN ----------------
    public User login(int accNo, int pin) {

        User user = userDAO.getUserByAccountAndPin(accNo, pin);

        if (user != null) {
            System.out.println("Login successful!");
            return user;
        } else {
            System.out.println("Invalid account number or PIN");
            return null;
        }
    }

    // ---------------- DEPOSIT ----------------
    public void deposit(User user, double amount) {

        if (amount <= 0) {
            System.out.println("Invalid deposit amount");
            return;
        }

        double newBalance = user.getBalance() + amount;

        userDAO.updateBalance(user.getAccountNo(), newBalance);
        user.setBalance(newBalance);

        transactionDAO.insertTransaction(
                user.getAccountNo(),
                "DEPOSIT",
                amount,
                newBalance
        );

        System.out.println("Deposit successful. New Balance: " + newBalance);
    }

    // ---------------- WITHDRAW ----------------
    public void withdraw(User user, double amount) {

        if (amount <= 0) {
            System.out.println("Invalid withdraw amount");
            return;
        }

        if (amount > user.getBalance()) {
            System.out.println("Insufficient balance");
            return;
        }

        double newBalance = user.getBalance() - amount;

        userDAO.updateBalance(user.getAccountNo(), newBalance);
        user.setBalance(newBalance);

        transactionDAO.insertTransaction(
                user.getAccountNo(),
                "WITHDRAW",
                amount,
                newBalance
        );

        System.out.println("Withdraw successful. New Balance: " + newBalance);
    }

    // ---------------- VIEW TRANSACTION HISTORY ----------------
    public List<Transaction> getTransactionHistory(int accountNo) {
        return transactionDAO.getTransactionsByAccount(accountNo);
    }

    // ---------------- CHANGE PIN ----------------
    public void changePin(User user, int oldPin, int newPin) {

        if (oldPin != user.getPin()) {
            System.out.println("Incorrect old PIN");
            return;
        }

        if (newPin <= 0 || newPin == oldPin) {
            System.out.println("Invalid new PIN");
            return;
        }

        userDAO.updatePin(user.getAccountNo(), newPin);
        user.setPin(newPin);

        System.out.println("PIN changed successfully!");
    }
}
