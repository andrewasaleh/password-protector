#ifndef __CRYPTOMANAGER_H__
#define __CRYPTOMANAGER_H__

#include <cryptopp/cryptlib.h>
#include <cryptopp/rijndael.h>
#include <cryptopp/modes.h>
#include <cryptopp/files.h>
#include <cryptopp/osrng.h>
#include <cryptopp/hex.h>
#include <string>
#include <cryptopp/eax.h>

using namespace CryptoPP;

class CryptoManager
{
private:
    AutoSeededRandomPool prng;
    SecByteBlock key;
    SecByteBlock iv;
    EAX<AES>::Encryption encryption;
    EAX<AES>::Decryption decryption;

public:
    CryptoManager();
    std::string Encrypt(std::string plaintext);
    std::string Decrypt(std::string ciphertext);
};

#endif // __CRYPTOMANAGER_H__