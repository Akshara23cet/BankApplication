package com.bank.dao;

import com.bank.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class UserDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Insert new user into database and return the generated account number
    public int createUser(User user) {
        try {
            String sql = "INSERT INTO users(name, pin, balance) VALUES (?, ?, ?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, user.getName());
                ps.setString(2, user.getPin());
                ps.setDouble(3, user.getBalance());
                return ps;
            }, keyHolder);

            Number key = keyHolder.getKey();
            if (key != null) {
                return key.intValue();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

    // Fetch user by account number only (for transfers)
    public User getUserByAccount(int accNo) {
        try {
            String sql = "SELECT * FROM users WHERE account_no=?";
            return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new User(
                    rs.getInt("account_no"),
                    rs.getString("name"),
                    rs.getString("pin"),
                    rs.getDouble("balance")
            ), accNo);
        } catch (EmptyResultDataAccessException e) {
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Update user balance
    public void updateBalance(int accNo, double newBalance) {
        try {
            String sql = "UPDATE users SET balance=? WHERE account_no=?";
            jdbcTemplate.update(sql, newBalance, accNo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Update user PIN
    public void updatePin(int accountNo, String newPin) {
        try {
            String sql = "UPDATE users SET pin=? WHERE account_no=?";
            jdbcTemplate.update(sql, newPin, accountNo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}