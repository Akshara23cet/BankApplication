package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.User;
import utils.DBConnection;

public class UserDAO {

    // Insert new user into database
    public void createUser(User user) {
        try {
            Connection con = DBConnection.getConnection();

            String sql = "INSERT INTO users(name, pin, balance) VALUES (?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, user.getName());
            ps.setInt(2, user.getPin());
            ps.setDouble(3, user.getBalance());

            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Fetch user by account number and pin (login)
    public User getUserByAccountAndPin(int accNo, int pin) {
        try {
            Connection con = DBConnection.getConnection();

            String sql = "SELECT * FROM users WHERE account_no=? AND pin=?";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setInt(1, accNo);
            ps.setInt(2, pin);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new User(
                    rs.getInt("account_no"),
                    rs.getString("name"),
                    rs.getInt("pin"),
                    rs.getDouble("balance")
                );
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
        public void updateBalance(int accNo, double newBalance) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "UPDATE users SET balance=? WHERE account_no=?";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setDouble(1, newBalance);
            ps.setInt(2, accNo);

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
        public void updatePin(int accountNo, int newPin) {
    try {
        Connection con = DBConnection.getConnection();
        String sql = "UPDATE users SET pin=? WHERE account_no=?";
        PreparedStatement ps = con.prepareStatement(sql);

        ps.setInt(1, newPin);
        ps.setInt(2, accountNo);

        ps.executeUpdate();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
    }

