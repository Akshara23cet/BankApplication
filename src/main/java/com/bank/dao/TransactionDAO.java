package com.bank.dao;

import com.bank.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper to convert ResultSet rows into Transaction objects
    private final RowMapper<Transaction> transactionRowMapper = (rs, rowNum) -> new Transaction(
            rs.getInt("txn_id"),
            rs.getInt("account_no"),
            rs.getString("type"),
            rs.getDouble("amount"),
            rs.getDouble("balance"),
            rs.getTimestamp("txn_time")
    );

    // Insert a new transaction record
    public void insertTransaction(int accountNo, String type,
                                  double amount, double balance) {
        String sql = "INSERT INTO transactions(account_no, type, amount, balance) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, accountNo, type, amount, balance);
    }

    // Fetch transaction history for an account
    public List<Transaction> getTransactionsByAccount(int accountNo) {
        String sql = "SELECT * FROM transactions WHERE account_no=? ORDER BY txn_time DESC";
        return jdbcTemplate.query(sql, transactionRowMapper, accountNo);
    }
}