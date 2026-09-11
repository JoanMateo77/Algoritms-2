# Ejercicio 04 - Aplicación en React

Una página por estructura de datos, con botones para recorrerlas.

## Estructura

```
src/
├── main.jsx          punto de entrada
├── App.jsx           menú y rutas
├── estilos.css
├── estructuras/      las listas, en módulos ES
├── datos/            canciones y páginas de prueba
├── componentes/      diagrama de nodos y caja de explicación
└── paginas/          una por estructura, más el inicio
```

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

Las listas viven en un `useRef`, no en el estado. Como son mutables, `append` las
cambia por dentro pero siguen siendo el mismo objeto, así que React no detecta el
cambio. El estado guarda una copia hecha con `toArray()`, que sí es un arreglo
nuevo cada vez.

Se usa `HashRouter` en vez de `BrowserRouter` para que las rutas funcionen al
publicar sin configurar redirecciones en el servidor.
