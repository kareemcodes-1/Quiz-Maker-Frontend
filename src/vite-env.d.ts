/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_BACKEND_URL: string; // Add your environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
