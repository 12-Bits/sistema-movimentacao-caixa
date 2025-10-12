import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // *** NOVA CONFIGURAÇÃO PARA O DOCKER HMR ***
  server: {
    // 1. Garante que o servidor Vite escute em todas as interfaces
    host: true, 
    
    // 2. Configuração do File System para Polling
    watch: {
      usePolling: true, // Força o Vite a verificar mudanças a cada 100ms (padrão)
    },
  },
  // *****************************************
})