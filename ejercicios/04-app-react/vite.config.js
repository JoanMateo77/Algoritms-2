import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { build } from 'esbuild';

const retosCommonJS = /ejercicios\/(04-pila-libros|05-cola-cajero|08-arbol-binario|09-arbol-nario|10-grafo-amigos)\//;

// en desarrollo vite sirve los archivos tal cual, y los retos usan require; se empaquetan como ESM al pedirlos
function cargarRetos() {
  return {
    name: 'cargar-retos-commonjs',
    apply: 'serve',
    async load(id) {
      if (!retosCommonJS.test(id) || !id.endsWith('.js')) return null;
      const { outputFiles } = await build({ entryPoints: [id], bundle: true, format: 'esm', write: false });
      return outputFiles[0].text;
    },
  };
}

export default defineConfig({
  plugins: [react(), cargarRetos()],
  base: './',
  build: { commonjsOptions: { include: [/node_modules/, retosCommonJS] } },
});
