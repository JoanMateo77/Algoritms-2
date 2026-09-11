# Ejercicio 01 - Lista enlazada simple

Reproductor que pasa canciones en orden.

## Archivos

- `Node.js` - el nodo, con un valor y un puntero `next`
- `LinkedList.js` - la lista con `append`, `peek`, `size`, `remove` y `print`
- `canciones.js` - datos de prueba
- `Reproductor.js` - usa la lista para pasar canciones
- `demo.js` - ejemplo de uso
- `*.test.js` - pruebas

## Ejecutar

```bash
npm run demo:1
npm test
```

## Complejidad

| Operación | Coste |
| --------- | ----- |
| append | O(1) |
| peek | O(n) |
| size | O(1) |
| remove | O(n) |
| print | O(n) |

El reproductor no tiene método `anterior()` porque en una lista simple cada nodo
solo conoce a su siguiente. Eso se resuelve en el ejercicio 02.
