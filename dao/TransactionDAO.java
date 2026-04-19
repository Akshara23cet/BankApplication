package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Transaction;
import utils.DBConnection;

public class TransactionDAO {

    // Insert a new transaction record
    public void insertTransaction(int accountNo, String type,
                                  double amount, double balance) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "INSERT INTO transactions(account_no, type, amount, balance) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setInt(1, accountNo);
            ps.setString(2, type);
            ps.setDouble(3, amount);
            ps.setDouble(4, balance);

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Fetch transaction history for an account
    public List<Transaction> getTransactionsByAccount(int accountNo) {

        List<Transaction> list = new ArrayList<>();

        try {
            Connection con = DBConnection.getConnection();
            String sql = "SELECT * FROM transactions WHERE account_no=? ORDER BY txn_time DESC";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setInt(1, accountNo);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Transaction txn = new Transaction(
                    rs.getInt("txn_id"),
                    rs.getInt("account_no"),
                    rs.getString("type"),
                    rs.getDouble("amount"),
                    rs.getDouble("balance"),
                    rs.getTimestamp("txn_time")
                );
                list.add(txn);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }



}
