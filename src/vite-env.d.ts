// /// <reference types="vite/client" /> 
// The above line is commented out or removed because of the error: "Cannot find type definition file for 'vite/client'".
// Manually defining the interface for import.meta.env as a workaround.

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // Add any other VITE_ prefixed environment variables your app uses here.
  // For example: readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
