# Reto 03 - Listas Enlazadas

Estructuras de Datos II
Universidad Autónoma de Occidente

Cada ejercicio está en su propia rama y todas se mezclaron sobre `main`.

## Integrantes

| Nombre | Rama | Correo |
| ------ | ---- | ------ |
| Joan Mateo Cardona Lorza | `01-lista-simple` a `04-app-react` | joan.cardona@uao.edu.co |

## Ramas

| Rama | Ejercicio | Estructura |
| ---- | --------- | ---------- |
| `01-lista-simple` | Reproductor de canciones en orden | Lista enlazada simple |
| `02-lista-doble` | Historial del navegador | Lista doblemente enlazada |
| `03-lista-circular` | Playlist en modo repetir | Lista circular |
| `04-app-react` | Aplicación con una página por estructura | Las tres |

```bash
git switch 01-lista-simple
```

## Ejecutar

Necesita Node 18 o superior. No hay que instalar nada.

```bash
npm test
npm run demo:1
npm run demo:2
npm run demo:3
```

La aplicación de React sí usa dependencias:

```bash
cd ejercicios/04-app-react
npm install
npm run dev
```

## Integración continua

En cada push a `main` se corren las pruebas y se compila la app de React, para
comprobar que todo sigue funcionando. Está en `.github/workflows/pruebas.yml`.

## Enunciado

1. Implement a linked list to play songs in order. Fill the list with mocked data.
2. Implement a doubly linked list to navigate back and forward between visited
   pages in the browser. Fill the list with fake data.
3. Create a project in react with 2 new pages, linked and doubly linked lists.
   Use the implemented lists in each page. Navigate through the lists by using
   buttons inside the pages.
