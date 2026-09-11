# Ejercicio 02 - Lista doblemente enlazada

Historial de navegador con botones atrás y adelante.

## Archivos

- `Node.js` - el nodo, ahora con `prev` además de `next`
- `DoublyLinkedList.js` - la lista con `append`, `peek`, `size`, `remove`, `print` y `printReverse`
- `paginas.js` - datos de prueba
- `Historial.js` - el historial con atrás y adelante
- `demo.js` - ejemplo de uso
- `*.test.js` - pruebas

## Ejecutar

```bash
npm run demo:2
npm test
```

## Complejidad

| Operación | Coste |
| --------- | ----- |
| append | O(1) |
| atras / adelante | O(1) |
| peek | O(n) |
| remove | O(n) buscar, O(1) desconectar |
| printReverse | O(n) |

La diferencia con el ejercicio 01 es una línea en el nodo: `this.prev = null`.
Con ella, retroceder pasa de O(n) a O(1).

## Agregado más allá del enunciado

El enunciado pide navegar atrás y adelante entre las páginas visitadas. Además
de eso, implementé el borrado del historial hacia adelante: si el usuario se
devuelve y desde ahí visita una página nueva, se eliminan todos los nodos
posteriores al actual y el botón de adelante queda deshabilitado. Es lo que hace
cualquier navegador real.

Está en `Historial.visitar`, que llama al método `removeAfter` de la lista. Lo
cubren las pruebas `visitar una página nueva desde el pasado BORRA el futuro` y
`removeAfter borra todo lo que viene después de un nodo`.

Si se quisiera el comportamiento sin ese borrado, basta con quitar el `if` del
principio de `visitar`.
