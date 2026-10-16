# Retos de Estructuras de Datos II

Universidad Autónoma de Occidente

Cada ejercicio está en su propia rama y todas se mezclaron sobre `main`.

## Integrantes

| Nombre | Ramas | Correo |
| ------ | ----- | ------ |
| Joan Mateo Cardona Lorza | todas | joan.cardona@uao.edu.co |

## Ramas

| Rama | Challenge | Ejercicio | Estructura |
| ---- | --------- | --------- | ---------- |
| `01-lista-simple` | 03 | Reproductor de canciones en orden | Lista enlazada simple |
| `02-lista-doble` | 03 | Historial del navegador | Lista doblemente enlazada |
| `03-lista-circular` | 03 (extra) | Playlist en modo repetir | Lista circular |
| `04-app-react` | 03 | Aplicación con una página por estructura | React |
| `04-pila-libros` | 04 | Pila de libros | Pila |
| `05-cola-cajero` | 05 | Cola de personas en un cajero | Cola |
| `08-arbol-binario` | 08 | Recorridos y búsqueda | Árbol binario |
| `09-arbol-nario` | 09 | Menú lateral con submenús | Árbol N-ario |
| `10-grafo-amigos` | 10 | Amigos y ciudades | Grafo |
| `11-busqueda-productos` | 11 | Buscador con top K | Trie y Heap |

```bash
git switch 10-grafo-amigos
```

## Ejecutar

Necesita Node 18 o superior. Las pruebas y los ejemplos de consola no necesitan
instalar nada:

```bash
npm test
npm run demo:1          # lista simple
npm run demo:2          # lista doble
npm run demo:3          # lista circular
npm run demo:pila
npm run demo:cola
npm run demo:arbol
npm run demo:menus
npm run demo:grafo
npm run demo:busqueda
```

La aplicación de React tiene una página por reto:

```bash
cd ejercicios/04-app-react
npm install
npm run dev
```

## Integración continua

En cada push a `main` se corren las pruebas y se compila la app de React, para
comprobar que todo sigue funcionando. Está en `.github/workflows/pruebas.yml`.

## Material

Las diapositivas y el PDF de Git están en `material-clase`. Las guías editables
están en `guias/README.md` y la versión para lectura en
`output/pdf/Guias-de-aprendizaje-estructuras-de-datos.pdf`.
