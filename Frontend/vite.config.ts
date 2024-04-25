import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {port: 5173, https: true },
  plugins: [react(), mkcert()],
});

