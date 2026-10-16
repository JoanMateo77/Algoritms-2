const test = require('node:test');
const assert = require('node:assert/strict');
const ColaCajero = require('./ColaCajero');
const personas = require('./personas');

function relojCon(...horas) {
  const pendientes = horas.map((hora) => new Date(`2026-09-17T${hora}:00.000Z`));
  return () => pendientes.shift();
}

test('la cola queda ordenada por la fecha de llegada aunque se agreguen en otro orden', () => {
  const cola = new ColaCajero(personas, relojCon('10:00', '09:00', '11:00', '09:30'));
  assert.deepEqual(cola.toArray().map((p) => p.nombre), ['Luis', 'Jorge', 'Ana', 'Marta']);
  assert.equal(cola.print(), 'Luis -> Jorge -> Ana -> Marta');
  assert.equal(cola.dequeue().nombre, 'Luis');
  assert.equal(cola.peek().nombre, 'Jorge');
});

test('con la misma hora de llegada se respeta el orden de ingreso', () => {
  const cola = new ColaCajero([], relojCon('09:00', '09:00', '08:00'));
  ['Eva', 'Leo', 'Iris'].forEach((nombre) => cola.enqueue({ nombre, monto: 1000 }));
  assert.deepEqual(cola.toArray().map((p) => p.nombre), ['Iris', 'Eva', 'Leo']);
});

test('el sistema asigna una llegada aleatoria de hoy entre las 8:00 y las 16:00', () => {
  const cola = new ColaCajero();
  for (let i = 0; i < 50; i++) cola.enqueue({ nombre: `P${i}`, monto: 1 });
  const llegadas = cola.toArray().map((p) => new Date(p.llegada));
  const hoy = new Date().toDateString();
  llegadas.forEach((llegada) => {
    assert.equal(llegada.toDateString(), hoy);
    assert.ok(llegada.getHours() >= 8 && llegada.getHours() < 16);
  });
  assert.ok(new Set(llegadas.map(Number)).size > 1);
  assert.deepEqual(llegadas, [...llegadas].sort((a, b) => a - b));
});

test('cola vacía y datos inválidos', () => {
  const cola = new ColaCajero();
  assert.equal(cola.dequeue(), null);
  assert.equal(cola.peek(), null);
  assert.throws(() => cola.enqueue({ nombre: '', monto: 1000 }));
  assert.throws(() => cola.enqueue({ nombre: 'Eva', monto: -1 }));
  assert.equal(cola.enqueue({ nombre: ' Eva ', monto: '1000' }).nombre, 'Eva');
});

test('atender muchas personas conserva el orden de llegada', () => {
  let minuto = 0;
  const cola = new ColaCajero([], () => new Date(Date.UTC(2026, 8, 17, 9, minuto++)));
  for (let i = 0; i < 100; i++) cola.enqueue({ nombre: `P${i}`, monto: 1 });
  for (let i = 0; i < 70; i++) assert.equal(cola.dequeue().nombre, `P${i}`);
  assert.equal(cola.size(), 30);
  assert.equal(cola.peek().nombre, 'P70');
  cola.enqueue({ nombre: 'Tarde', monto: 1 });
  assert.equal(cola.toArray().at(-1).nombre, 'Tarde');
});
