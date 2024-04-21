import * as crypto from "crypto";

export function encrypt(text: string) {
  const key = Buffer.from(process.env.OAUTH_ENCRYPT_KEY , 'hex'),
        iv = Buffer.from(process.env.OAUTH_ENCRYPT_IV, 'hex');
        
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        
        encrypted += cipher.final('base64');
        return encrypted;
      }
      
export function decrypt(encryptedText: string) {
  const key = Buffer.from(process.env.OAUTH_ENCRYPT_KEY , 'hex'),
        iv = Buffer.from(process.env.OAUTH_ENCRYPT_IV, 'hex');

  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  
    decrypted += decipher.final('utf8');
  
    return decrypted;
  } catch {
    return null;
  }
}
