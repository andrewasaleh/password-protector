#include <CryptoManager.h>

using namespace CryptoPP;

CryptoManager::CryptoManager()
{
    key.resize(AES::DEFAULT_KEYLENGTH);
    iv.resize(AES::BLOCKSIZE);
    prng.GenerateBlock(key, key.size());
    prng.GenerateBlock(iv, iv.size());
}

std::string CryptoManager::Encrypt(std::string plaintext)
{
    std::string ciphertext;
    
    encryption.SetKeyWithIV(key, key.size(), iv);
    StringSource(plaintext, true, new AuthenticatedEncryptionFilter(encryption, new StringSink(ciphertext)));

    return ciphertext;
}

std::string CryptoManager::Decrypt(std::string ciphertext)
{

    std::string originaltext;

    decryption.SetKeyWithIV(key, key.size(), iv);
    StringSource(ciphertext, true, new AuthenticatedDecryptionFilter(decryption, new StringSink(originaltext)));

    return originaltext;
}
