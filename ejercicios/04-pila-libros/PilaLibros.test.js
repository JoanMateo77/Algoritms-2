const test = require('node:test');
const assert = require('node:assert/strict');
const PilaLibros = require('./PilaLibros');
const libros = require('./libros');

test('la pila entrega primero el último libro agregado', () => {
  const pila = new PilaLibros(libros);
  assert.equal(pila.peek().nombre, 'La metamorfosis');
  assert.equal(pila.pop().nombre, 'La metamorfosis');
  assert.equal(pila.pop().nombre, 'El principito');
  assert.equal(pila.size(), 1);
});

test('la pila vacía y los datos inválidos se manejan explícitamente', () => {
  const pila = new PilaLibros();
  assert.equal(pila.isEmpty(), true);
  assert.equal(pila.peek(), null);
  assert.equal(pila.pop(), null);
  assert.throws(() => pila.push({ nombre: 'Incompleto' }));
});

test('un campo con solo espacios no cuenta como dato', () => {
  const pila = new PilaLibros();
  assert.throws(() => pila.push({ nombre: '   ', isbn: '1', autor: 'A', editorial: 'E' }));
  const libro = pila.push({ nombre: ' Ficciones ', isbn: '1', autor: 'Borges', editorial: 'Emecé', extra: 'x' });
  assert.deepEqual(libro, { nombre: 'Ficciones', isbn: '1', autor: 'Borges', editorial: 'Emecé' });
});
