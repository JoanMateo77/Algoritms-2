const test = require('node:test');
const assert = require('node:assert/strict');
const { Trie } = require('./Trie');
const MinHeap = require('./MinHeap');
const MotorBusqueda = require('./MotorBusqueda');
const productos = require('./productos');

test('el ejemplo de la diapositiva devuelve los dos air más populares', () => {
  const motor = new MotorBusqueda();
  motor.insert('air max', 90);
  motor.insert('air force', 95);
  motor.insert('air jordan', 85);
  motor.insert('adidas boost', 80);
  assert.deepEqual(motor.searchTopK('air', 2), [
    { name: 'air force', popularity: 95 },
    { name: 'air max', popularity: 90 },
  ]);
});

test('searchTopK filtra por prefijo, ignora mayúsculas y maneja casos límite', () => {
  const motor = new MotorBusqueda(productos);
  assert.deepEqual(motor.searchTopK('NIKE', 5).map((p) => p.name), ['nike dunk', 'nike cortez']);
  assert.deepEqual(motor.searchTopK('a', 3).map((p) => p.name), ['air force', 'air max', 'adidas samba']);
  assert.equal(motor.searchTopK('', 20).length, productos.length);
  assert.deepEqual(motor.searchTopK('zara', 3), []);
  assert.deepEqual(motor.searchTopK('air', 0), []);
  assert.throws(() => motor.insert('', 10));
  assert.throws(() => motor.insert('vans', 'mucha'));
});

test('volver a insertar un producto actualiza su popularidad y los empates van en orden alfabético', () => {
  const motor = new MotorBusqueda([{ name: 'air max', popularity: 50 }, { name: 'air zoom', popularity: 70 }]);
  motor.insert('air max', 70);
  assert.deepEqual(motor.searchTopK('air', 5), [
    { name: 'air max', popularity: 70 },
    { name: 'air zoom', popularity: 70 },
  ]);
});

test('el trie guarda la palabra en el camino y marca el final', () => {
  const trie = new Trie();
  trie.insert('air');
  trie.insert('airs');
  assert.equal(trie.root.value, null);
  assert.equal(trie.root.children.get('a').value, 'a');
  assert.equal(trie.search('air'), true);
  assert.equal(trie.search('ai'), false);
  assert.deepEqual(trie.startsWith('ai'), ['air', 'airs']);
  assert.deepEqual(trie.startsWith('b'), []);
});

test('el heap mínimo entrega siempre el menor', () => {
  const heap = new MinHeap().heapify([9, 4, 7, 1, 8, 2]);
  assert.equal(heap.peek(), 1);
  heap.push(0);
  assert.equal(heap.size(), 7);
  const ordenados = [];
  while (heap.size()) ordenados.push(heap.pop());
  assert.deepEqual(ordenados, [0, 1, 2, 4, 7, 8, 9]);
  assert.equal(heap.pop(), null);
  assert.deepEqual(new MinHeap().heapify([3, 1, 2]).toArray()[0], 1);
});
