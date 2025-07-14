import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Escucha en todas las IPs, crucial para que sea accesible desde Docker
    port: 5173, // El puerto que usará Vite DENTRO del contenedor
    // La magia para que el Hot Reloading funcione en Docker:
    watch: {
      usePolling: true
    }
  }
})
