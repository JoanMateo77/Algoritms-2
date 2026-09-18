const test = require('node:test');
const assert = require('node:assert/strict');
const crearMenus = require('./menus');

test('los recorridos DFS y BFS respetan las ramas', () => {
  const arbol = crearMenus();
  assert.deepEqual(arbol.dfs().map((n) => n.titulo), [
    'Inicio', 'Estudiar', 'Pilas y colas', 'Árboles', 'Practicar', 'Recorridos'
  ]);
  assert.deepEqual(arbol.bfs().map((n) => n.titulo), [
    'Inicio', 'Estudiar', 'Practicar', 'Pilas y colas', 'Árboles', 'Recorridos'
  ]);
  assert.equal(arbol.buscar('/estudiar/arboles').componente, 'Arboles');
  assert.equal(arbol.buscar('/desconocido'), null);
});
