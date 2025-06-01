import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // Make sure you import react plugin if you're using React

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // -------------------------------------------------------------
      // 1. ADD THE BASE PATH FOR GITHUB PAGES
      // Replace 'i-ching-musical-composer' with your actual repository name
      // It must start and end with a slash.
      base: '/i-ching-musical-composer/',
      // -------------------------------------------------------------

      plugins: [
        react() // Make sure you have the React plugin if this is a React app
      ],

      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});