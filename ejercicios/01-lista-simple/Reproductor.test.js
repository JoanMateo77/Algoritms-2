const test = require('node:test');
const assert = require('node:assert');

const Reproductor = require('./Reproductor');
const CANCIONES_DE_PRUEBA = [
  { titulo: 'Uno', artista: 'A', duracion: '1:00' },
  { titulo: 'Dos', artista: 'B', duracion: '2:00' },
  { titulo: 'Tres', artista: 'C', duracion: '3:00' },
];

function reproductorDePrueba() {
  return new Reproductor().cargar(CANCIONES_DE_PRUEBA);
}

test('un reproductor nuevo no tiene canciones ni nada sonando', () => {
  const reproductor = new Reproductor();

  assert.strictEqual(reproductor.cuantas(), 0);
  assert.strictEqual(reproductor.cancionActual(), null);
});

test('cargar mete todas las canciones en la playlist', () => {
  const reproductor = reproductorDePrueba();

  assert.strictEqual(reproductor.cuantas(), 3);
});

test('reproducir empieza por la primera canción', () => {
  const reproductor = reproductorDePrueba();

  const cancion = reproductor.reproducir();

  assert.strictEqual(cancion.titulo, 'Uno');
  assert.strictEqual(reproductor.cancionActual().titulo, 'Uno');
});

test('siguiente avanza las canciones en el orden en que se agregaron', () => {
  const reproductor = reproductorDePrueba();
  reproductor.reproducir();

  assert.strictEqual(reproductor.siguiente().titulo, 'Dos');
  assert.strictEqual(reproductor.siguiente().titulo, 'Tres');
});

test('al pasar la última canción la playlist se acaba y queda en null', () => {
  const reproductor = reproductorDePrueba();
  reproductor.reproducir();
  reproductor.siguiente(); // Dos
  reproductor.siguiente(); // Tres

  assert.strictEqual(reproductor.siguiente(), null);
  assert.strictEqual(reproductor.cancionActual(), null);
});

test('siguiente sin haber dado play devuelve null', () => {
  const reproductor = reproductorDePrueba();

  assert.strictEqual(reproductor.siguiente(), null);
});

test('reproducir una playlist vacía devuelve null', () => {
  const reproductor = new Reproductor();

  assert.strictEqual(reproductor.reproducir(), null);
});

test('quitar saca la canción por título y baja el conteo', () => {
  const reproductor = reproductorDePrueba();

  const quitada = reproductor.quitar('Dos');

  assert.strictEqual(quitada, true);
  assert.strictEqual(reproductor.cuantas(), 2);
});

test('quitar la canción que está sonando pasa a la siguiente', () => {
  const reproductor = reproductorDePrueba();
  reproductor.reproducir(); // suena Uno

  reproductor.quitar('Uno');

  assert.strictEqual(reproductor.cancionActual().titulo, 'Dos');
  assert.strictEqual(reproductor.cuantas(), 2);
});

test('quitar una canción que no existe devuelve false', () => {
  const reproductor = reproductorDePrueba();

  assert.strictEqual(reproductor.quitar('No existe'), false);
  assert.strictEqual(reproductor.cuantas(), 3);
});

test('listar marca con una flecha la canción que suena', () => {
  const reproductor = reproductorDePrueba();
  reproductor.reproducir();

  const texto = reproductor.listar();

  assert.ok(texto.includes('>  1. Uno'));
  assert.ok(texto.includes('   2. Dos'));
});

test('listar una playlist vacía lo dice con palabras', () => {
  const reproductor = new Reproductor();

  assert.strictEqual(reproductor.listar(), '(playlist vacía)');
});
