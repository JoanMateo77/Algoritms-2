const test = require('node:test');
const assert = require('node:assert/strict');
const ColaCajero = require('./ColaCajero');
const personas = require('./personas');

test('la primera persona en llegar es la primera atendida', () => {
  const cola = new ColaCajero(personas);
  assert.equal(cola.peek().nombre, 'Ana');
  assert.equal(cola.dequeue().nombre, 'Ana');
  assert.deepEqual(cola.toArray().map((p) => p.nombre), ['Luis', 'Marta']);
});

test('la llegada se asigna por el sistema y se conservan los vacíos', () => {
  const cola = new ColaCajero();
  assert.equal(cola.dequeue(), null);
  const nueva = cola.enqueue({ nombre: 'Eva', monto: 1000 });
  assert.ok(!Number.isNaN(new Date(nueva.llegada).getTime()));
  assert.equal(cola.size(), 1);
  assert.throws(() => cola.enqueue({ nombre: '', monto: -1 }));
});
