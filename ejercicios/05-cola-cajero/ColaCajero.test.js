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

test('la llegada la asigna el reloj del sistema al momento de agregar', () => {
  const ahora = new Date('2026-09-17T10:00:00.000Z');
  const cola = new ColaCajero([], () => ahora);
  assert.equal(cola.dequeue(), null);
  const nueva = cola.enqueue({ nombre: 'Eva', monto: 1000 });
  assert.equal(nueva.llegada, ahora.toISOString());
  assert.equal(cola.size(), 1);
  assert.throws(() => cola.enqueue({ nombre: '', monto: -1 }));
});

test('atender muchas personas conserva el orden de llegada', () => {
  const cola = new ColaCajero();
  for (let i = 0; i < 100; i++) cola.enqueue({ nombre: `P${i}`, monto: 1 });
  for (let i = 0; i < 70; i++) assert.equal(cola.dequeue().nombre, `P${i}`);
  assert.equal(cola.size(), 30);
  assert.equal(cola.peek().nombre, 'P70');
});
