import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        // This will remove the warning in development
        parserOpts: {
          plugins: ['decorators-legacy']
        }
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      // Suppress findDOMNode warning
      'use-node-env': 'silent' 
    }
  }
});
