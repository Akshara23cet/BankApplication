package model;

public class User {
    private int accountNo;
    private String name;
    private int pin;
    private double balance;

    public  User(int accountNo,String name,int pin,double balance){
        this.accountNo=accountNo;
        this.name=name;
        this.pin=pin;
        this.balance=balance;
        
    }

    public int getAccountNo() {
        return accountNo;
    }

    public String getName() {
        return name;
    }

    public int getPin() {
        return pin;
    }

    public double getBalance() {
        return balance;
    }

    public void setAccountNo(int accountNo) {
        this.accountNo = accountNo;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPin(int pin) {
        this.pin = pin;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
    
}
