import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: { commonjsOptions: { include: [/node_modules/, /ejercicios\/(04-pila-libros|05-cola-cajero|08-arbol-binario|09-arbol-nario)\//] } },
});
