# Reto 11: buscador de productos con Trie y Heap

Fuente: `Clase 11 - Tries_n_Heaps.pptx`, diapositiva 21.

Cada producto tiene `name` y `popularity`. `Trie.js` guarda los nombres letra
por letra: la información está en el camino y el último nodo se marca con
`isEndOfWord`. `startsWith` recoge todos los productos bajo un prefijo.

`MinHeap.js` tiene `push`, `pop`, `peek`, `heapify`, `percolateUp`,
`percolateDown`, `swap`, `size` y `toArray`. `searchTopK` mantiene un heap de
tamaño K: si se pasa, saca el menos popular, así al final quedan los K mejores.

Ejecuta `npm run demo:busqueda` desde la raíz.
