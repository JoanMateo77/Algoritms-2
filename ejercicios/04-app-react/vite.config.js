import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { build } from 'esbuild';

// los retos de las otras carpetas de ejercicios/ están escritos con require y module.exports
const retosCommonJS = /ejercicios\/(?!04-app-react\/)[^/]+\/[^/]+\.js$/;

// en desarrollo vite sirve los archivos tal cual; por eso cada reto se empaqueta como ESM al pedirlo
function cargarRetos() {
  return {
    name: 'cargar-retos-commonjs',
    apply: 'serve',
    async load(id) {
      if (!retosCommonJS.test(id)) return null;
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
