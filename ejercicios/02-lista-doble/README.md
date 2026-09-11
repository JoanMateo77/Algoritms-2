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

Detalle implementado: si el usuario se devuelve y desde ahí visita una página
nueva, el historial borra todo lo que tenía hacia adelante, igual que un
navegador real.
