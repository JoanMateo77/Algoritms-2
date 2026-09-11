# Ejercicio 03 - Lista circular

Playlist en modo repetir. Ejercicio extra: el profesor menciona las listas
circulares en clase pero no las pide en el reto.

## Archivos

- `Node.js` - el nodo, idéntico al de la lista simple
- `CircularLinkedList.js` - la lista donde el último apunta al primero
- `canciones.js` - datos de prueba
- `PlaylistRepetir.js` - la playlist que no se acaba
- `demo.js` - ejemplo de uso
- `*.test.js` - pruebas

## Ejecutar

```bash
npm run demo:3
npm test
```

## Notas

No hay `null` en ninguna parte: `tail.next` apunta a `head`. Por eso un recorrido
con `while (current)` nunca termina y hay que usar `do-while` parando cuando se
vuelve al head.

Al eliminar el head hay que acordarse de que el tail apunte al head nuevo, o el
círculo queda roto.

El método `siguiente()` de la playlist es igual al del ejercicio 01. Lo que cambia
no es el reproductor sino cómo están conectados los nodos.
