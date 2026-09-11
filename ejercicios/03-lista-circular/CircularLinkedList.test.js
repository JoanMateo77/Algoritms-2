const test = require('node:test');
const assert = require('node:assert');

const CircularLinkedList = require('./CircularLinkedList');

function listaABC() {
  const lista = new CircularLinkedList();
  lista.append('A');
  lista.append('B');
  lista.append('C');
  return lista;
}

test('una lista nueva está vacía', () => {
  const lista = new CircularLinkedList();

  assert.strictEqual(lista.head, null);
  assert.strictEqual(lista.tail, null);
  assert.strictEqual(lista.size(), 0);
  assert.strictEqual(lista.isEmpty(), true);
});

test('un solo nodo se apunta a sí mismo', () => {
  const lista = new CircularLinkedList();
  lista.append('A');

  assert.strictEqual(lista.head, lista.tail);
  assert.strictEqual(lista.head.next, lista.head);
});

test('el último nodo apunta al primero, nunca a null', () => {
  const lista = listaABC();

  assert.strictEqual(lista.tail.next, lista.head);
  assert.notStrictEqual(lista.tail.next, null);
});

test('append mantiene el orden en una vuelta', () => {
  const lista = listaABC();

  assert.deepStrictEqual(lista.toArray(), ['A', 'B', 'C']);
  assert.strictEqual(lista.size(), 3);
});

test('caminar más pasos que elementos vuelve a empezar', () => {
  const lista = listaABC();
  let nodo = lista.head;
  const recorrido = [];

  for (let i = 0; i < 7; i++) {
    recorrido.push(nodo.value);
    nodo = nodo.next;
  }

  assert.deepStrictEqual(recorrido, ['A', 'B', 'C', 'A', 'B', 'C', 'A']);
});

test('peek encuentra cualquier valor sin quedarse dando vueltas', () => {
  const lista = listaABC();

  assert.strictEqual(lista.peek('C').value, 'C');
  assert.strictEqual(lista.peek('Z'), null);
});

test('peek en una lista vacía devuelve null', () => {
  const lista = new CircularLinkedList();

  assert.strictEqual(lista.peek('A'), null);
});

test('remove del head mueve el head y vuelve a cerrar el círculo', () => {
  const lista = listaABC();

  lista.remove('A');

  assert.deepStrictEqual(lista.toArray(), ['B', 'C']);
  assert.strictEqual(lista.head.value, 'B');
  assert.strictEqual(lista.tail.next, lista.head);
});

test('remove del medio salta el nodo y deja el círculo cerrado', () => {
  const lista = listaABC();

  lista.remove('B');

  assert.deepStrictEqual(lista.toArray(), ['A', 'C']);
  assert.strictEqual(lista.head.next.value, 'C');
  assert.strictEqual(lista.tail.next, lista.head);
});

test('remove del tail actualiza el tail y cierra el círculo', () => {
  const lista = listaABC();

  lista.remove('C');

  assert.deepStrictEqual(lista.toArray(), ['A', 'B']);
  assert.strictEqual(lista.tail.value, 'B');
  assert.strictEqual(lista.tail.next, lista.head);
});

test('remove del único nodo deja la lista vacía', () => {
  const lista = new CircularLinkedList();
  lista.append('A');

  const eliminado = lista.remove('A');

  assert.strictEqual(eliminado.value, 'A');
  assert.strictEqual(lista.head, null);
  assert.strictEqual(lista.tail, null);
  assert.strictEqual(lista.size(), 0);
});

test('remove de un valor que no existe no cambia nada', () => {
  const lista = listaABC();

  assert.strictEqual(lista.remove('Z'), null);
  assert.strictEqual(lista.size(), 3);
  assert.strictEqual(lista.tail.next, lista.head);
});

test('quitar todos los nodos uno por uno deja la lista vacía y sana', () => {
  const lista = listaABC();

  lista.remove('B');
  lista.remove('A');
  lista.remove('C');

  assert.strictEqual(lista.size(), 0);
  assert.strictEqual(lista.head, null);
  assert.deepStrictEqual(lista.toArray(), []);
});

test('print muestra una vuelta y avisa que vuelve al principio', () => {
  const lista = listaABC();

  assert.strictEqual(lista.print(), 'A -> B -> C -> (vuelve a A)');
});

test('print de una lista vacía no se cuelga', () => {
  const lista = new CircularLinkedList();

  assert.strictEqual(lista.print(), '(vacía)');
});

test('toArray da exactamente una vuelta, no infinitas', () => {
  const lista = listaABC();

  assert.strictEqual(lista.toArray().length, 3);
});
