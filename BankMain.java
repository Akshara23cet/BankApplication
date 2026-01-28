import java.util.Scanner;
import service.BankService;
import model.User;

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
                    String name = sc.next();
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
                        System.out.println("Welcome, " + user.getName());
                        System.out.println("Balance: " + user.getBalance());

                        System.out.print("Enter amount to deposit: ");
                        double amount = sc.nextDouble();
                        bankService.deposit(user, amount);
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
