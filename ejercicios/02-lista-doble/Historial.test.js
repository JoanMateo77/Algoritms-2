const test = require('node:test');
const assert = require('node:assert');

const Historial = require('./Historial');

const A = { url: 'https://a.com', titulo: 'A' };
const B = { url: 'https://b.com', titulo: 'B' };
const C = { url: 'https://c.com', titulo: 'C' };
const D = { url: 'https://d.com', titulo: 'D' };

function historialABC() {
  const historial = new Historial();
  historial.visitar(A);
  historial.visitar(B);
  historial.visitar(C);
  return historial;
}

test('un historial nuevo está vacío y sin página actual', () => {
  const historial = new Historial();

  assert.strictEqual(historial.cuantas(), 0);
  assert.strictEqual(historial.paginaActual(), null);
});

test('en un historial vacío los dos botones están apagados', () => {
  const historial = new Historial();

  assert.strictEqual(historial.puedeIrAtras(), false);
  assert.strictEqual(historial.puedeIrAdelante(), false);
});

test('visitar deja al usuario parado en la página nueva', () => {
  const historial = new Historial();

  historial.visitar(A);

  assert.strictEqual(historial.paginaActual().titulo, 'A');
  assert.strictEqual(historial.cuantas(), 1);
});

test('con una sola página visitada no se puede ir a ningún lado', () => {
  const historial = new Historial();
  historial.visitar(A);

  assert.strictEqual(historial.puedeIrAtras(), false);
  assert.strictEqual(historial.puedeIrAdelante(), false);
});

test('atrás devuelve a la página anterior', () => {
  const historial = historialABC();

  const pagina = historial.atras();

  assert.strictEqual(pagina.titulo, 'B');
  assert.strictEqual(historial.paginaActual().titulo, 'B');
});

test('atrás dos veces llega a la primera página', () => {
  const historial = historialABC();

  historial.atras();
  historial.atras();

  assert.strictEqual(historial.paginaActual().titulo, 'A');
  assert.strictEqual(historial.puedeIrAtras(), false);
});

test('atrás en la primera página devuelve null y no se mueve', () => {
  const historial = historialABC();
  historial.atras();
  historial.atras();

  assert.strictEqual(historial.atras(), null);
  assert.strictEqual(historial.paginaActual().titulo, 'A');
});

test('adelante recupera la página que dejamos atrás', () => {
  const historial = historialABC();
  historial.atras();

  const pagina = historial.adelante();

  assert.strictEqual(pagina.titulo, 'C');
});

test('adelante en la última página devuelve null', () => {
  const historial = historialABC();

  assert.strictEqual(historial.adelante(), null);
  assert.strictEqual(historial.paginaActual().titulo, 'C');
});

test('ir atrás y adelante varias veces no pierde ni duplica páginas', () => {
  const historial = historialABC();

  historial.atras();
  historial.atras();
  historial.adelante();
  historial.adelante();

  assert.strictEqual(historial.paginaActual().titulo, 'C');
  assert.strictEqual(historial.cuantas(), 3);
});

test('visitar una página nueva desde el pasado BORRA el futuro', () => {
  const historial = historialABC();
  historial.atras();

  historial.visitar(D);

  assert.strictEqual(historial.cuantas(), 3);
  assert.strictEqual(historial.paginaActual().titulo, 'D');
  assert.strictEqual(historial.puedeIrAdelante(), false);
});

test('después de borrar el futuro, atrás sigue funcionando bien', () => {
  const historial = historialABC();
  historial.atras();
  historial.visitar(D);

  assert.strictEqual(historial.atras().titulo, 'B');
  assert.strictEqual(historial.atras().titulo, 'A');
  assert.strictEqual(historial.puedeIrAtras(), false);
});

test('listar marca con una flecha la página actual', () => {
  const historial = historialABC();
  historial.atras();

  const texto = historial.listar();

  assert.ok(texto.includes('>  2. B'));
});

test('listar un historial vacío lo dice con palabras', () => {
  const historial = new Historial();

  assert.strictEqual(historial.listar(), '(historial vacío)');
});
