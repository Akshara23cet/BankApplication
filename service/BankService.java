package service;

import dao.UserDAO;
import model.User;

public class BankService {

    private UserDAO userDAO = new UserDAO();

    // Create account
    public void createAccount(String name, int pin) {
        User user = new User(0, name, pin, 0.0);
        userDAO.createUser(user);
        System.out.println("Account created successfully!");
    }

    // Login
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

     public void deposit(User user, double amount) {
        if (amount <= 0) {
            System.out.println("Invalid amount");
            return;
        }

        double newBalance = user.getBalance() + amount;
        userDAO.updateBalance(user.getAccountNo(), newBalance);
        user.setBalance(newBalance);

        System.out.println("Deposit successful!");
        System.out.println("Updated Balance: " + user.getBalance());
    }
}
