const test = require('node:test');
const assert = require('node:assert/strict');
const { ArbolBinario } = require('./ArbolBinario');

test('recorridos y búsqueda del árbol binario', () => {
  const arbol = new ArbolBinario([8, 3, 10, 1, 6, 14, 4, 7, 13]);
  assert.deepEqual(arbol.inorden(), [1, 3, 4, 6, 7, 8, 10, 13, 14]);
  assert.deepEqual(arbol.preorden(), [8, 3, 1, 6, 4, 7, 10, 14, 13]);
  assert.deepEqual(arbol.postorden(), [1, 4, 7, 6, 3, 13, 14, 10, 8]);
  assert.equal(arbol.contiene(7), true);
  assert.equal(arbol.contiene(9), false);
  assert.equal(arbol.insertar(8), false);
});

test('árbol vacío y estructura que necesita react-d3-tree', () => {
  const arbol = new ArbolBinario();
  assert.deepEqual(arbol.inorden(), []);
  assert.equal(arbol.paraD3(), null);
  arbol.insertar(8);
  arbol.insertar(3);
  assert.deepEqual(arbol.paraD3(), { name: '8', children: [{ name: '3', children: [] }] });
});
