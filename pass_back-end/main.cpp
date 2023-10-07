#include <string>
#include <iostream>
#include <CryptoManager.h>

using namespace std;

int main()
{

    CryptoManager c;
    string plaintext;

    cout << "Plaintext: ";
    cin >> plaintext;

    string ciphertext = c.Encrypt(plaintext);

    cout << "Cipher text: " << ciphertext << endl;
    cout << "Plaintext: " << c.Decrypt(ciphertext) << endl;

    return 0;
}