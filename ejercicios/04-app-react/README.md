# Aplicación en React

Una página por reto, con botones y formularios que operan sobre la estructura.

## Estructura

```
src/
├── main.jsx          punto de entrada
├── App.jsx           menú y rutas
├── estilos.css
├── componentes/      diagrama de nodos y caja de explicación
└── paginas/          una por reto, más el inicio
```

Las páginas no tienen copias de las estructuras: importan las clases y los datos
de prueba directamente de la carpeta de cada reto (`ejercicios/01-lista-simple`,
`ejercicios/05-cola-cajero`, etc.).

## Ejecutar

```bash
npm install
npm run dev
```

Para publicar:

```bash
npm run build     # deja todo en dist/
```

## Notas

Los retos están escritos con `require` y `module.exports` para correr con Node.
Al compilar, Vite los convierte solo; en desarrollo los sirve tal cual, así que
`vite.config.js` tiene un pequeño plugin que los empaqueta como módulos ES.

`react-d3-graph` declara compatibilidad solo con React 16, aunque funciona con
React 18. Por eso `.npmrc` tiene `legacy-peer-deps=true`.

Las estructuras viven en un `useRef`, no en el estado. Como son mutables, React
no detecta sus cambios; el estado guarda una copia hecha con `toArray()` o un
contador de versión que obliga a volver a pintar.

Se usa `HashRouter` en vez de `BrowserRouter` para que las rutas funcionen al
publicar sin configurar redirecciones en el servidor.
