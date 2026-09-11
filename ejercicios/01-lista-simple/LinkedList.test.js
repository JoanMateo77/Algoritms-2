const test = require('node:test');
const assert = require('node:assert');

const LinkedList = require('./LinkedList');
const Node = require('./Node');

test('un nodo nuevo guarda su valor y no apunta a nadie', () => {
  const nodo = new Node('hola');

  assert.strictEqual(nodo.value, 'hola');
  assert.strictEqual(nodo.next, null);
});

test('una lista nueva está vacía', () => {
  const lista = new LinkedList();

  assert.strictEqual(lista.head, null);
  assert.strictEqual(lista.tail, null);
  assert.strictEqual(lista.size(), 0);
  assert.strictEqual(lista.isEmpty(), true);
});

test('append en lista vacía deja el mismo nodo como head y como tail', () => {
  const lista = new LinkedList();
  lista.append('A');

  assert.strictEqual(lista.head.value, 'A');
  assert.strictEqual(lista.tail.value, 'A');
  assert.strictEqual(lista.head, lista.tail);
  assert.strictEqual(lista.size(), 1);
});

test('append agrega al final y mantiene el orden', () => {
  const lista = new LinkedList();
  lista.append('A');
  lista.append('B');
  lista.append('C');

  assert.deepStrictEqual(lista.toArray(), ['A', 'B', 'C']);
  assert.strictEqual(lista.head.value, 'A');
  assert.strictEqual(lista.tail.value, 'C');
  assert.strictEqual(lista.tail.next, null);
  assert.strictEqual(lista.size(), 3);
});

test('peek encuentra un valor y devuelve su nodo', () => {
  const lista = new LinkedList();
  lista.append('A');
  lista.append('B');
  lista.append('C');

  const nodo = lista.peek('B');

  assert.strictEqual(nodo.value, 'B');
  assert.strictEqual(nodo.next.value, 'C');
});

test('peek devuelve null cuando el valor no está', () => {
  const lista = new LinkedList();
  lista.append('A');

  assert.strictEqual(lista.peek('Z'), null);
});

test('remove del primer elemento mueve el head', () => {
  const lista = new LinkedList();
  lista.append('A');
  lista.append('B');
  lista.append('C');

  lista.remove('A');

  assert.deepStrictEqual(lista.toArray(), ['B', 'C']);
  assert.strictEqual(lista.head.value, 'B');
  assert.strictEqual(lista.size(), 2);
});

test('remove del elemento del medio reconecta las flechas', () => {
  const lista = new LinkedList();
  lista.append('A');
  lista.append('B');
  lista.append('C');

  lista.remove('B');

  assert.deepStrictEqual(lista.toArray(), ['A', 'C']);
  assert.strictEqual(lista.head.next.value, 'C');
});

test('remove del último elemento actualiza el tail', () => {
  const lista = new LinkedList();
  lista.append('A');
  lista.append('B');
  lista.append('C');

  lista.remove('C');

  assert.deepStrictEqual(lista.toArray(), ['A', 'B']);
  assert.strictEqual(lista.tail.value, 'B');
  assert.strictEqual(lista.tail.next, null);
});

test('remove del único elemento deja la lista vacía', () => {
  const lista = new LinkedList();
  lista.append('A');

  lista.remove('A');

  assert.strictEqual(lista.head, null);
  assert.strictEqual(lista.tail, null);
  assert.strictEqual(lista.size(), 0);
});

test('remove de un valor que no existe no cambia la lista', () => {
  const lista = new LinkedList();
  lista.append('A');
  lista.append('B');

  const resultado = lista.remove('Z');

  assert.strictEqual(resultado, null);
  assert.deepStrictEqual(lista.toArray(), ['A', 'B']);
  assert.strictEqual(lista.size(), 2);
});

test('remove en una lista vacía devuelve null', () => {
  const lista = new LinkedList();

  assert.strictEqual(lista.remove('A'), null);
});

test('print arma el texto con flechas y termina en null', () => {
  const lista = new LinkedList();
  lista.append('A');
  lista.append('B');

  assert.strictEqual(lista.print(), 'A -> B -> null');
});

test('print de una lista vacía es solo null', () => {
  const lista = new LinkedList();

  assert.strictEqual(lista.print(), 'null');
});

test('find busca usando una condición', () => {
  const lista = new LinkedList();
  lista.append({ titulo: 'Clocks' });
  lista.append({ titulo: 'Yellow' });

  const encontrada = lista.find((c) => c.titulo === 'Yellow');

  assert.strictEqual(encontrada.titulo, 'Yellow');
  assert.strictEqual(lista.find((c) => c.titulo === 'Nada'), null);
});
