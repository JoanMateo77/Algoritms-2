const test = require('node:test');
const assert = require('node:assert');

const DoublyLinkedList = require('./DoublyLinkedList');
const Node = require('./Node');

function listaABC() {
  const lista = new DoublyLinkedList();
  lista.append('A');
  lista.append('B');
  lista.append('C');
  return lista;
}

test('un nodo doble nace sin siguiente y sin anterior', () => {
  const nodo = new Node('hola');

  assert.strictEqual(nodo.value, 'hola');
  assert.strictEqual(nodo.next, null);
  assert.strictEqual(nodo.prev, null);
});

test('una lista nueva está vacía', () => {
  const lista = new DoublyLinkedList();

  assert.strictEqual(lista.head, null);
  assert.strictEqual(lista.tail, null);
  assert.strictEqual(lista.size(), 0);
  assert.strictEqual(lista.isEmpty(), true);
});

test('append en lista vacía deja el nodo como head y tail, sin flechas', () => {
  const lista = new DoublyLinkedList();
  lista.append('A');

  assert.strictEqual(lista.head, lista.tail);
  assert.strictEqual(lista.head.prev, null);
  assert.strictEqual(lista.head.next, null);
});

test('append enlaza los nodos en las DOS direcciones', () => {
  const lista = listaABC();

  assert.deepStrictEqual(lista.toArray(), ['A', 'B', 'C']);
  assert.deepStrictEqual(lista.toArrayReverse(), ['C', 'B', 'A']);
});

test('el head no tiene anterior y el tail no tiene siguiente', () => {
  const lista = listaABC();

  assert.strictEqual(lista.head.prev, null);
  assert.strictEqual(lista.tail.next, null);
});

test('cada nodo apunta correctamente a su vecino de los dos lados', () => {
  const lista = listaABC();
  const nodoB = lista.peek('B');

  assert.strictEqual(nodoB.prev.value, 'A');
  assert.strictEqual(nodoB.next.value, 'C');
});

test('peek encuentra el nodo, o devuelve null si no está', () => {
  const lista = listaABC();

  assert.strictEqual(lista.peek('C').value, 'C');
  assert.strictEqual(lista.peek('Z'), null);
});

test('remove del medio reconecta las dos flechas', () => {
  const lista = listaABC();

  lista.remove('B');

  assert.deepStrictEqual(lista.toArray(), ['A', 'C']);
  assert.deepStrictEqual(lista.toArrayReverse(), ['C', 'A']);
  assert.strictEqual(lista.head.next.value, 'C');
  assert.strictEqual(lista.tail.prev.value, 'A');
  assert.strictEqual(lista.size(), 2);
});

test('remove del primero mueve el head y le quita el anterior al nuevo head', () => {
  const lista = listaABC();

  lista.remove('A');

  assert.strictEqual(lista.head.value, 'B');
  assert.strictEqual(lista.head.prev, null);
  assert.deepStrictEqual(lista.toArrayReverse(), ['C', 'B']);
});

test('remove del último mueve el tail', () => {
  const lista = listaABC();

  lista.remove('C');

  assert.strictEqual(lista.tail.value, 'B');
  assert.strictEqual(lista.tail.next, null);
  assert.deepStrictEqual(lista.toArray(), ['A', 'B']);
});

test('remove del único nodo deja la lista totalmente vacía', () => {
  const lista = new DoublyLinkedList();
  lista.append('A');

  lista.remove('A');

  assert.strictEqual(lista.head, null);
  assert.strictEqual(lista.tail, null);
  assert.strictEqual(lista.size(), 0);
});

test('el nodo eliminado queda desconectado de la lista', () => {
  const lista = listaABC();

  const eliminado = lista.remove('B');

  assert.strictEqual(eliminado.value, 'B');
  assert.strictEqual(eliminado.prev, null);
  assert.strictEqual(eliminado.next, null);
});

test('remove de algo que no existe no cambia la lista', () => {
  const lista = listaABC();

  assert.strictEqual(lista.remove('Z'), null);
  assert.strictEqual(lista.size(), 3);
});

test('print y printReverse muestran la lista en cada sentido', () => {
  const lista = listaABC();

  assert.strictEqual(lista.print(), 'A <-> B <-> C <-> null');
  assert.strictEqual(lista.printReverse(), 'C <-> B <-> A <-> null');
});

test('removeAfter borra todo lo que viene después de un nodo', () => {
  const lista = listaABC();
  lista.append('D');
  const nodoB = lista.peek('B');

  const borrados = lista.removeAfter(nodoB);

  assert.strictEqual(borrados, 2);
  assert.deepStrictEqual(lista.toArray(), ['A', 'B']);
  assert.strictEqual(lista.tail.value, 'B');
  assert.strictEqual(lista.tail.next, null);
  assert.strictEqual(lista.size(), 2);
});

test('removeAfter sobre el último nodo no borra nada', () => {
  const lista = listaABC();

  const borrados = lista.removeAfter(lista.tail);

  assert.strictEqual(borrados, 0);
  assert.strictEqual(lista.size(), 3);
});
