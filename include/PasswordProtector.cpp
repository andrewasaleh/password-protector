#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>

// Function to generate a random password
std::string generatePassword(int length) {
    const std::string charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    const int charsetLength = charset.length();

    std::string password;
    srand(static_cast<unsigned int>(time(nullptr)));

    for (int i = 0; i < length; ++i) {
        int randomIndex = rand() % charsetLength;
        password += charset[randomIndex];
    }

    return password;
}

int main() {
    int passwordLength;
    std::cout << "Enter the desired password length: ";
    std::cin >> passwordLength;

    if (passwordLength <= 0) {
        std::cout << "Invalid password length. Please enter a positive integer." << std::endl;
        return 1;
    }

    std::string password = generatePassword(passwordLength);
    std::cout << "Generated Password: " << password << std::endl;

    return 0;
}
