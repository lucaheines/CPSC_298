import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.xml.bind.DatatypeConverter;

public class SecureLogin {
    static class Email {
        String value;

        Email(String value) {
            this.value = value;
            // Add validation logic here
        }
    }

    static class SecureString {
        char[] value;

        SecureString(String value) {
            this.value = value.toCharArray();
            // Here, you could enforce password policies
        }

        void clear() {
            java.util.Arrays.fill(this.value, '0');
        }
    }

    static class HashedPassword {
        String algorithm;
        String value;

        HashedPassword(String algorithm, String value) {
            this.algorithm = algorithm;
            this.value = value;
        }
    }

    static HashedPassword secureHashPassword(SecureString password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(new String(password.value).getBytes());
        byte[] digest = md.digest();
        password.clear(); // Clear the password from memory
        return new HashedPassword("SHA-256", DatatypeConverter.printHexBinary(digest));
    }

    static boolean login(Email username, SecureString password) throws NoSuchAlgorithmException {
        HashedPassword hashedPassword = secureHashPassword(password);
        // Here, implement logic to compare hashedPassword with stored value
        return true; // Placeholder
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {
        Email email = new Email("user@example.com");
        SecureString password = new SecureString("StrongPassword!");
        boolean isAuthenticated = login(email, password);

        System.out.println("Authentication successful: " + isAuthenticated);
    }
}
