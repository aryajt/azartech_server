import * as CryptoJS from 'crypto-js';

// Decrypt the userId using AES
export function decryptUserId(encryptedUserId: string): string {
    const key = process.env.AES_KEY; // Retrieve the AES key from the environment variables
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedUserId, key);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}
