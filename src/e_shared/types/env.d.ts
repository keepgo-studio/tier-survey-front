declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CLIENT_ID: string;
    HASHED_ID_INIT: string;
    OAUTH_ENCRYPT_KEY: string;
    OAUTH_ENCRYPT_IV: string;
  }
}