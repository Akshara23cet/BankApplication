import java.util.Scanner;
import java.util.List;
import service.BankService;
import model.User;
import model.Transaction;

public class BankMain {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        BankService bankService = new BankService();

        while (true) {
            System.out.println("\n----- Online Banking System -----");
            System.out.println("1. Create Account");
            System.out.println("2. Login");
            System.out.println("3. Exit");
            System.out.print("Choose option: ");

            int choice = sc.nextInt();

            switch (choice) {

                case 1:
                    System.out.print("Enter name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter PIN: ");
                    int pin = sc.nextInt();
                    bankService.createAccount(name, pin);
                    break;

                case 2:
                    System.out.print("Enter Account Number: ");
                    int accNo = sc.nextInt();
                    System.out.print("Enter PIN: ");
                    int loginPin = sc.nextInt();

                    User user = bankService.login(accNo, loginPin);

                    if (user != null) {
                        while (true) {
                            System.out.println("\n1. Deposit");
                            System.out.println("2. Withdraw");
                            System.out.println("3. View Transaction History");
                            System.out.println("4. Check Balance");
                            System.out.println("5. Logout");
 

                            int option = sc.nextInt();

                            if (option == 1) {
                                System.out.print("Enter deposit amount: ");
                                double amt = sc.nextDouble();
                                bankService.deposit(user, amt);

                            } else if (option == 2) {
                                System.out.print("Enter withdraw amount: ");
                                double amt = sc.nextDouble();
                                bankService.withdraw(user, amt);

                            } else if (option == 3) {

                                List<Transaction> transactions =
                                    bankService.getTransactionHistory(user.getAccountNo());

                                if (transactions.isEmpty()) {
                                    System.out.println("No transactions found.");
                                } else {
                                    System.out.println("\n--- Transaction History ---");
                                    for (Transaction t : transactions) {
                                        System.out.println(
                                            t.getTxnTime() + " | " +
                                            t.getType() + " | " +
                                            "Amount: " + t.getAmount() + " | " +
                                            "Balance: " + t.getBalance()
                                        );
                                    }
                                }

                            }else if(option==4){
                                System.out.println("Current Balance:" + user.getBalance());

                            }else if (option == 5) {
                                System.out.println("Logged out successfully");
                                break;
                            } else {
                                System.out.println("Invalid option");
                            }
                        }
                    }
                    break;

                case 3:
                    System.out.println("Thank you for using the system!");
                    sc.close();
                    System.exit(0);

                default:
                    System.out.println("Invalid choice!");
            }
        }
    }
}
