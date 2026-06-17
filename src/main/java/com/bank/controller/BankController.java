package com.bank.controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.model.User;
import com.bank.model.Transaction;
import com.bank.service.BankService;
import com.bank.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/bank")
@CrossOrigin(origins = "*")
public class BankController {

    @Autowired
    private BankService bankService;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ PUBLIC — no token needed
    @GetMapping("/test")
    public String test() {
        return "API WORKING";
    }

    // ✅ PUBLIC — no token needed
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        int accNo = Integer.parseInt(body.get("accNo"));
        int pin = Integer.parseInt(body.get("pin"));

        User user = bankService.login(accNo, pin);
        if (user != null) {
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getAccountNo());

            // Return token + user info
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("token", token);
            response.put("accNo", user.getAccountNo());
            response.put("name", user.getName());
            response.put("balance", user.getBalance());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Invalid account number or PIN");
        }
    }

    // ✅ PUBLIC — no token needed
    @PostMapping("/create")
    public ResponseEntity<String> createAccount(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        int pin = Integer.parseInt(body.get("pin"));

        String result = bankService.createAccount(name, pin);
        if (result.contains("successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // 🔐 PROTECTED — token required
    @PostMapping("/deposit")
    public ResponseEntity<String> deposit(@RequestBody Map<String, String> body,
                                          HttpServletRequest request) {
        int accNo = (int) request.getAttribute("accNo");
        int pin = Integer.parseInt(body.get("pin"));
        double amount = Double.parseDouble(body.get("amount"));

        String result = bankService.deposit(accNo, pin, amount);
        if (result.contains("successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // 🔐 PROTECTED — token required
    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestBody Map<String, String> body,
                                           HttpServletRequest request) {
        int accNo = (int) request.getAttribute("accNo");
        int pin = Integer.parseInt(body.get("pin"));
        double amount = Double.parseDouble(body.get("amount"));

        String result = bankService.withdraw(accNo, pin, amount);
        if (result.contains("successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // 🔐 PROTECTED — token required
    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody Map<String, String> body,
                                           HttpServletRequest request) {
        int fromAcc = (int) request.getAttribute("accNo");
        int pin = Integer.parseInt(body.get("pin"));
        int toAcc = Integer.parseInt(body.get("toAcc"));
        double amount = Double.parseDouble(body.get("amount"));

        String result = bankService.transfer(fromAcc, pin, toAcc, amount);
        if (result.contains("successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // 🔐 PROTECTED — token required
    @GetMapping("/balance")
    public ResponseEntity<String> checkBalance(HttpServletRequest request) {
        int accNo = (int) request.getAttribute("accNo");
        User user = bankService.login(accNo, 0);

        // Get user by accNo directly
        String result = bankService.getBalance(accNo);
        return ResponseEntity.ok(result);
    }

    // 🔐 PROTECTED — token required
    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getTransactions(HttpServletRequest request) {
        int accNo = (int) request.getAttribute("accNo");
        List<Transaction> list = bankService.getTransactionHistory(accNo);
        return ResponseEntity.ok(list);
    }

    // 🔐 PROTECTED — token required
    @PostMapping("/change-pin")
    public ResponseEntity<String> changePin(@RequestBody Map<String, String> body,
                                            HttpServletRequest request) {
        int accNo = (int) request.getAttribute("accNo");
        int oldPin = Integer.parseInt(body.get("oldPin"));
        int newPin = Integer.parseInt(body.get("newPin"));

        String result = bankService.changePin(accNo, oldPin, newPin);
        if (result.contains("successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
}