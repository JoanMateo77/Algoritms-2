const test = require('node:test');
const assert = require('node:assert');

const PlaylistRepetir = require('./PlaylistRepetir');

const CANCIONES = [
  { titulo: 'Uno', artista: 'A', duracion: '1:00' },
  { titulo: 'Dos', artista: 'B', duracion: '2:00' },
  { titulo: 'Tres', artista: 'C', duracion: '3:00' },
];

function playlistDePrueba() {
  return new PlaylistRepetir().cargar(CANCIONES);
}

test('una playlist nueva está vacía', () => {
  const playlist = new PlaylistRepetir();

  assert.strictEqual(playlist.cuantas(), 0);
  assert.strictEqual(playlist.cancionActual(), null);
});

test('reproducir empieza por la primera canción', () => {
  const playlist = playlistDePrueba();

  assert.strictEqual(playlist.reproducir().titulo, 'Uno');
});

test('siguiente avanza en orden', () => {
  const playlist = playlistDePrueba();
  playlist.reproducir();

  assert.strictEqual(playlist.siguiente().titulo, 'Dos');
  assert.strictEqual(playlist.siguiente().titulo, 'Tres');
});

test('después de la última canción vuelve la primera, sin devolver null', () => {
  const playlist = playlistDePrueba();
  playlist.reproducir();
  playlist.siguiente();
  playlist.siguiente();

  const cancion = playlist.siguiente();

  assert.notStrictEqual(cancion, null);
  assert.strictEqual(cancion.titulo, 'Uno');
});

test('diez canciones seguidas en una playlist de tres se repiten en ciclo', () => {
  const playlist = playlistDePrueba();
  playlist.reproducir();

  const sonaron = [playlist.cancionActual().titulo];
  for (let i = 0; i < 9; i++) {
    sonaron.push(playlist.siguiente().titulo);
  }

  assert.deepStrictEqual(sonaron, [
    'Uno', 'Dos', 'Tres',
    'Uno', 'Dos', 'Tres',
    'Uno', 'Dos', 'Tres',
    'Uno',
  ]);
});

test('vueltas cuenta los ciclos completos', () => {
  const playlist = playlistDePrueba();
  playlist.reproducir();

  assert.strictEqual(playlist.vueltas(), 0);

  playlist.siguiente();
  playlist.siguiente();

  assert.strictEqual(playlist.vueltas(), 1);
});

test('proximas muestra la cola de reproducción y también da la vuelta', () => {
  const playlist = playlistDePrueba();
  playlist.reproducir();

  const cola = playlist.proximas(4).map((c) => c.titulo);

  assert.deepStrictEqual(cola, ['Dos', 'Tres', 'Uno', 'Dos']);
});

test('quitar la canción que suena pasa a la siguiente', () => {
  const playlist = playlistDePrueba();
  playlist.reproducir();

  playlist.quitar('Uno');

  assert.strictEqual(playlist.cancionActual().titulo, 'Dos');
  assert.strictEqual(playlist.cuantas(), 2);
});

test('quitar la última canción que queda deja la playlist vacía', () => {
  const playlist = new PlaylistRepetir().cargar([CANCIONES[0]]);
  playlist.reproducir();

  playlist.quitar('Uno');

  assert.strictEqual(playlist.cuantas(), 0);
  assert.strictEqual(playlist.cancionActual(), null);
});

test('siguiente en una playlist vacía devuelve null sin colgarse', () => {
  const playlist = new PlaylistRepetir();

  assert.strictEqual(playlist.siguiente(), null);
});

test('listar avisa que la playlist se repite', () => {
  const playlist = playlistDePrueba();

  assert.ok(playlist.listar().includes('vuelve a empezar'));
});
